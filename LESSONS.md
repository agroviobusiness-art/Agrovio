# Lessons Learned — Agrovio build

Hard-won gotchas from building this project. **Read before touching the relevant area** so we don't repeat the pain. (Companion to `CLAUDE.md`.)

---

## Next.js 16 (it really differs from older Next / training data)
- **`images.qualities` is required** (defaults to `[75]`). Any `<Image quality={N}>` not in the allow-list is silently coerced. → configured `images.qualities = [75, 90]` in `next.config.ts`.
- **`next/image` `priority` is deprecated.** Use `loading="eager"` + `fetchPriority="high"` for the LCP/hero image (or the new `preload`). We use eager+fetchPriority on the hero mock.
- **`cookies()`, `headers()`, `params`, `searchParams` are async** — must `await`. No sync access.
- **`middleware.ts` → `proxy.ts`** in v16 (Node runtime only; no edge). We **avoid it entirely** — auth is enforced per-page with `getUser()` + `redirect`/`notFound`.
- **`scroll-behavior: smooth`** is ignored unless `<html data-scroll-behavior="smooth">` (set in `app/layout.tsx`).
- Static image imports from `/public` work and give automatic width/height + blur placeholders.
- Before using an unfamiliar API, read `node_modules/next/dist/docs/` (the generated `AGENTS.md` says this for a reason).

## Tailwind v4
- Tokens go in `app/globals.css` under `@theme` (e.g. `--color-brand`) → become `bg-brand` etc. Font wired via `@theme inline { --font-sans: var(--font-space-grotesk) }`.
- Opacity modifiers (`bg-brand/10`, `text-white/80`) work on custom theme colors. `sr-only` / `not-sr-only` are built in.

## Zod 4
- Use top-level format validators: `z.email("msg")` (not `.string().email()`).
- `z.enum` custom-message API changed — for robustness we used `.refine(...)` for the role field.
- For field errors, iterate `error.issues` and build `{ field: message }` (`.flatten()` is deprecated). See `fieldErrorsFrom` in `lib/validation.ts`.

## Vercel (Hobby / non-Pro plan)
- **One concurrent build.** Firing multiple deploys at once (e.g. a `git push` auto-deploy *and* a CLI `vercel --prod` together) jams the queue — deployments stick at **`UNKNOWN` with a 0ms build**. Fix: delete the stuck deployments (`vercel remove <url> --yes`) and run **one** clean deploy.
- **Don't `vercel remove` a deployment a CLI is still tracking** → the running deploy errors with "Deployment not found."
- GitHub→Vercel **auto-deploy works** on push to `main`. Either push *or* CLI — not both at once.
- `vercel link`/`env add`/`deploy`/`ls` need an explicit **`--scope agroviobusiness-3730s-projects`** in non-interactive mode. `vercel env add ... preview` wants a git-branch arg; production+development are straightforward.
- The deploy **author shows "Karim Semaan"** — that's the *display name* on the `agroviobusiness-3730` account (same account, not a wrong login). Rename under Vercel → Settings → Profile if desired.
- NEXT_PUBLIC and runtime env var changes only apply after a **redeploy**.

## Windows-specific
- **`vercel build` (local prebuilt) fails with `EPERM: operation not permitted, symlink ...`** unless Windows **Developer Mode** is on (or the terminal is elevated). → Just use **remote builds** (`vercel --prod` builds on Vercel's Linux), which don't have this issue. Local prebuilt was only attempted to dodge a (since-resolved) build-queue jam.
- `create-next-app .` rejects a folder with capital letters (`Agrovio_Business`). → scaffold into a lowercase subdir, then relocate files to the repo root.
- Git shows `LF will be replaced by CRLF` warnings — harmless; we commit with `git -c core.autocrlf=false`.

## Supabase
- **Auth config is NOT reachable via the MCP or SQL.** Site URL, redirect URLs, email templates, SMTP, and the "allow new users to sign up" toggle are only changeable in the **dashboard** or via the **Management API + a Personal Access Token**. (The MCP is scoped to DB + project management.) Public sign-ups are already **disabled**.
- **Service-role key** (`SUPABASE_SERVICE_ROLE_KEY`) enables the **Auth Admin API** (`createUser`, `generateLink`, `updateUserById`, `deleteUser`) and bypasses RLS — but it does **not** change project config. Keep it **server-only** (`lib/supabase/admin.ts`, never in a Client Component).
- **Self-contained invite/reset (no email config needed):** `admin.auth.admin.generateLink({ type })` returns `data.properties.hashed_token`. Build the URL ourselves: `${SITE_URL}/auth/confirm?token_hash=<hash>&type=<invite|recovery>&next=/account/update-password`. Our `/auth/confirm` route `verifyOtp`s it. This sidesteps Supabase's email templates entirely.
- **Reversible delete = ban**, not hard-delete: `updateUserById(id, { ban_duration: '876000h' })` removes (verified: sets `banned_until`); `{ ban_duration: 'none' }` restores. Hard delete is `deleteUser(id)`. `listUsers()` returns `banned_until` so we can show a "Removed" list.
- **RLS on `invite_requests`:** insert-only policy `to anon, authenticated` (no SELECT, so the public/anon key can't read submitted PII). The `WITH CHECK` is hardened (valid email, length caps, role ∈ {Producer,Buyer}) — not `true` — which also clears the advisor lint.
- **Rate limiting (self-contained, no external service):** `public.rate_limit_hit(key, max, window_seconds)` — atomic `SECURITY DEFINER` plpgsql (`search_path` set, parameterized so `key` can't inject) + a locked-down `rate_limits` table. **Call it with the service-role client only** — the advisor flags anon-executable SECURITY DEFINER functions (`0028`/`0029`), so EXECUTE is revoked from anon/authenticated. The contact form also uses a **honeypot** (`company_website` hidden field → silently drop). IP is SHA-256 hashed before keying (no raw IP stored); fail-open on RPC error (logged). **TODO:** `rate_limits` grows one row per unique IP-hash — add periodic cleanup (`delete from rate_limits where window_start < now() - interval '1 day'`, via pg_cron) if it gets large. Note: **leaked-password protection** (advisor WARN) is **Pro-plan only** (Auth → Providers → Email) — N/A on Free, and low priority for invite-only. On Free, raise min password length + required characters there instead.
- **Emailing arbitrary recipients** (invites/resets to other people) needs a **verified domain in Resend** *or* Supabase's built-in email (rate-limited + needs Site URL/template config). Resend's onboarding domain only delivers to the account owner. Until a domain is verified, the admin portal hands out **copy-able links**.

## Assets
- The feature **mockup PNGs** (`Mock 2–5`, `Hero Mock Up`) are 6000×3375 with the UI filling <50% — **trim** them (`sharp().trim()`) so they show large, and **float on white** (no gray panel) to match Framer.
- **Do NOT trim `investor-santa-sofia.jpeg`** — it's a *designed* light-gray card with the logo centered; show it untrimmed.
- The **leadership photo** source was ~21 MB → resize with `sharp` before committing.
- The wordmark logo PNG is **white** (for green backgrounds); render "agrovio" as live text where the background isn't green.
- Raw source art lives in the git-ignored `agrovio_assets/`; only optimized copies go in `public/assets/`.

## Design fidelity (vs agrovio.framer.website)
- Framer renders the **feature H2s in brand green** (`#338F50`); the section-label H2s (Leadership Team, Our investors, Request an invite) stay near-black. `SectionHeading` has a `tone` prop for this.
- Framer's **mobile is broken** (horizontal overflow, clipped text) — we built a proper responsive layout instead of replicating it.
- Footer is **flat `#338F50`** with **social icons** (not text links); the **South America map** sits beside the invite form.
- Original Framer copy had typos (`offfers`, `pontential`, `Connect a with`) — we fixed them.

## Auth & admin architecture
- **No middleware/proxy.** Protected pages call `supabase.auth.getUser()` (validates the token, unlike `getSession()`) and `redirect`/`notFound`. This is the recommended Data-Access-Layer pattern.
- **Admin portal is hidden**: `requireAdmin()` calls **`notFound()`** (a 404) for anyone who isn't a signed-in admin — *not* a redirect (a redirect to `/login` would hint the area exists). Plus: no public links, `noindex`, admins routed to `/admin` on login.
- The marketing `SiteHeader`/`SiteFooter` return `null` on `/admin` (via `usePathname`) so the portal has its own clean chrome.

## Working with this client
- The client is **non-technical with Supabase** → prefer **in-app buttons** (the admin portal) over "go click this in the dashboard" wherever possible.
- Do **one clean deploy** and verify it; don't spray multiple deploys (see Vercel notes).
- For **data-sensitive features** (delete/recover, RLS, auth), verify against the live API/DB before shipping — we test with throwaway records and clean them up.
