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

## Page transitions & motion (native View Transitions API)
The smooth page-to-page crossfade + scroll reveals live in `components/motion/` + a "Motion system" block in `app/globals.css`. Hard-won details:
- **Enable** with `experimental: { viewTransition: true }` in `next.config.ts`, then use React's `<ViewTransition>` (`import { ViewTransition } from "react"`). The runtime export ships in **Next's bundled React** — but to make `tsc` happy add `/// <reference types="react/canary" />` at the top of the file (the tsconfig has no `"types"` array, so canary types are otherwise inert). Don't add a `types` array (it would drop other global types).
- **Use a stable `name`, not class-based `update`/`enter`.** We wrap page content in `<ViewTransition name="page-content">` and target everything with **name** selectors. Reason: `::view-transition-group(.someClass)` (class match) is **not reliably honored for the `group` pseudo** in current Chromium (it works for `old`/`new` but not `group`), and one unhonored selector in a comma list **drops the whole rule** — so a `group(root), group(.page)` rule silently fails for *both*. Name selectors (`group(page-content)`, `group(root)`, `group(site-header)`) always work.
- **Kill the geometry morph for a full-page crossfade:** `::view-transition-group(page-content), ::view-transition-group(root) { animation: none }`. Otherwise the browser interpolates the group's *size* between pages, so navigating between a tall page and a short one (home → login) **squishes** the outgoing snapshot. With the group static, only `::view-transition-old/new(page-content)` opacity (+ a 12px rise on `new`) animates — a clean dissolve in place.
- **Anchor persistent chrome** (header/footer) so it never flashes/moves: give it a `view-transition-name` via a **Tailwind arbitrary class** `[view-transition-name:site-header]` (a stylesheet rule, **not** inline `style=` → survives a future nonce-tightened CSP), then `::view-transition-group(site-header){ animation:none; z-index:100 }` + `::view-transition-old(site-header){ display:none }` + `::view-transition-new(site-header){ animation:none }`. The **`z-index:100` is required** (per the Next doc) — without it the fading-out page can paint over the header mid-transition.
- **Reduced motion:** layer real motion inside `@media (prefers-reduced-motion: no-preference)` AND add the hard kill-switch `@media (prefers-reduced-motion: reduce){ ::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){ animation-duration:0s!important; animation-delay:0s!important } }` (otherwise the browser's *default* crossfade still runs for reduced-motion users).
- **Scroll reveal without a no-flash `<script>`:** `<Reveal>` (IntersectionObserver, sets `data-shown`) hides via CSS gated on `@media (prefers-reduced-motion: no-preference) and (scripting: enabled)`. `(scripting: enabled)` means the hidden state only applies when JS is on, it's in the stylesheet (evaluated before first paint → no flash), and with JS off content is just visible (no SEO cloaking — markup is identical, only opacity/transform differ). Stagger via `[--reveal-delay:Nms]` (Tailwind arbitrary property = stylesheet, not inline style). Full-bleed colored bands use the `.reveal-fade` modifier (opacity-only; a `translateY` there exposes a sliver of the section behind).
- **Verifying view transitions in a browser:** hook `document.startViewTransition`, and on `t.ready` read `document.getAnimations()` → each entry's `effect.pseudoElement` (which `::view-transition-*` group) + `effect.animationName` (which keyframe) + duration. That's how you *prove* the right groups animate with your keyframes and the chrome stays anchored, instead of eyeballing it.
- **`next start` gotcha (Windows, local only):** killing a backgrounded `npm run start` via the captured `$!` PID only kills the **npm wrapper**, not the child `next-server` — orphaned servers keep serving **stale** assets (HTML referencing a CSS hash not on disk → served `text/plain`, then rejected by our `nosniff`). Kill by **port** instead (`netstat -ano | grep :3000` → `taskkill //PID <pid> //F`), and `rm -rf .next` before a clean rebuild. This is **not** a production issue — Vercel's CDN sets `text/css` by extension.

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

## Pulling a finished Framer page into the app (Framer Server API)
The design lives in Framer; pages are matched/rebuilt by hand (no code export). To read a finished page **without publishing**, use Framer's **official `framer-api` Server API** — it reads the live editor (unpublished) canvas. *No third-party "Framer MCP" needed* (those are community-built, write-oriented, and would route the client's key through someone else's infra).
- **Key:** create in Framer → **Site Settings → General** (project-bound, authenticates as the creator). Store as `FRAMER_API_KEY` in **`.env.local`** — server-only, **never** `NEXT_PUBLIC`, git-ignored. Not added to Vercel (local extraction tool only).
- **Connect:** `connect("https://framer.com/projects/<slug>--<id>?node=<pageId>", key)`. **You MUST include `?node=<pageId>`** to read a non-home page — `getChildren` on a non-active `WebPageNode` returns `[]`, and `getCanvasRoot()` always returns the home `/` page.
- **Find pages:** `getNodesWithType("WebPageNode")` → every page with its `path` (`/`, `/producer`, `/buyer`, …). `getPublishInfo()` gives the staging/prod URLs.
- **Gotchas:** TextNode **copy is in `node.name`** (`getText()` returns empty). Pass node **id strings** to `getChildren(id)` (the object form throws *"Cannot stringify non-POJOs"*). `screenshot(nodeId)` returns `{data:{type:'Buffer',data:[…]}, mimeType}` → `Buffer.from(shot.data.data)`. Images are `node.backgroundImage.url` on `framerusercontent.com` (public, downloadable).
- **Reusable scripts** live OUTSIDE the repo in `C:\Users\semaa\framer-extract\` (verify / explore / dump-producer / download-assets `.mjs`, official SDK installed there so the repo's `package.json` stays clean). Swap the node id to pull `/buyer` or `/chat` next.
- **Producer design was desktop-only** (1241px) → we built the responsive/mobile layout ourselves, **harmonized with Home** (white sections, green accents, existing components — not Framer's literal gray/blue), and added **Inter for body** (Space Grotesk stays for headings via an `h1–h4` base rule + the `font-display` utility). Fixed Framer copy typos (e.g. "bluerberry" → "blueberry"; "+1" → "#1").
