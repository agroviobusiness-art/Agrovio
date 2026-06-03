@AGENTS.md

# Agrovio — Project Guide

> Read this first, then skim **LESSONS.md** for the gotchas already hit (don't repeat them).

## What this is
The **Agrovio** marketing site — an **invite-only B2B agro-produce marketplace** for Peru / LATAM. It's built **for a client** (agroviobusiness@gmail.com), not for the developer personally. Live at **https://agrovio.io** (also reachable at `agrovio.vercel.app` during/after the domain cutover).

## Stack
- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4** (tokens in `app/globals.css` `@theme`)
- **Supabase** via `@supabase/ssr` — database + auth
- **Resend** — transactional email
- **Zod 4** — validation
- Font: **Space Grotesk** (`next/font`, weight 500 headings)
- Deployed on **Vercel**

## ⚠️ Accounts are the CLIENT'S (never use a personal one)
| Service | Detail |
|---|---|
| Supabase | project ref `xlyjtnctvmlqwyxjisbn` (org: agroviobusiness@gmail.com). Use the Supabase MCP authed to **this** account. |
| Vercel | scope `agroviobusiness-3730s-projects`, project `agrovio`. `whoami` = `agroviobusiness-3730`. The deploy author shows **"Karim Semaan"** — that's just the account's display name, *same account*, cosmetic. |
| GitHub | `github.com/agroviobusiness-art/Agrovio`. Commits **in this repo** are authored `Agrovio <agroviobusiness@gmail.com>` via repo-local `git config` — leave it. |

## Commands
```bash
npm run dev      # local dev
npm run build    # production build (validates TS + routes) — run before deploying
npm run start    # serve the production build locally
```

## Project structure
```
app/
  page.tsx                      Home (faithful to agrovio.framer.website + responsive mobile)
  producer|buyer|chat/          "Coming soon" placeholders — CLIENT is building the real ones; don't replace unless asked
  inviterequest/                Full-page contact/invite form
  login | forgot-password/      Invite-only auth (sign-in + reset request)
  account/update-password/      Set/choose password (after invite or reset link)
  welcome/                      Post-login landing (admins get an "Open admin portal" link)
  auth/confirm/route.ts         Verifies invite/reset email tokens (verifyOtp), sets session, forwards to set-password
  admin/                        HIDDEN admin portal (dashboard, leads, members) — gated, 404 for non-admins
  actions/                      Server actions: invite.ts, auth.ts, admin.ts
components/  layout/ ui/ sections/ forms/ admin/
lib/
  supabase/server.ts            SSR client (anon key, cookie-based) — for components/actions/auth
  supabase/admin.ts             SERVICE-ROLE client — SERVER-ONLY, never import in a Client Component
  admin.ts                      requireAdmin() gate + ADMIN_EMAILS allowlist
  validation.ts (Zod) · email.ts (Resend) · content.ts · utils.ts
supabase/migrations/            Version-controlled DB schema (mirror of the remote project) — see supabase/README.md
docs/RUNBOOK.md                 1-page recovery runbook (bad deploy / data loss / paused Free project)
public/assets/                  Optimized images (raw originals are in the git-ignored agrovio_assets/)
```

## How the main pieces work
- **Contact form** (`/inviterequest` + home) → server action validates with Zod → inserts into Supabase `invite_requests` (RLS: insert-only, anon can't read) → Resend emails the team. Zod rules are stricter than the DB policy. The insert runs via the **service-role** client so it can read the row id back; if the notification email fails, that row is flagged `notification_failed` and the admin **Invite requests** page surfaces "N leads where the email didn't send" (leads are never lost — the row is the source of truth).
- **Invite-only auth**: public sign-ups are **disabled** in Supabase, so accounts only exist when the admin creates them. Login is sign-in only. `/auth/confirm` handles invite + reset email links (`verifyOtp` with `token_hash`), then `/account/update-password` (`updateUser`).
- **Hidden admin portal** (`/admin`): gated by `requireAdmin()` (allowlist `ADMIN_EMAILS`). Non-admins get **`notFound()` (404)** — never a redirect — so the portal is undiscoverable. Admins are routed to `/admin` on login. It can: view leads, **Accept** a lead (invite + mark accepted), invite/reset via copy-able links, and **Remove (reversible ban) / Restore / Delete-forever** members.
- **Invites/resets** are generated server-side with the service-role `admin.auth.generateLink` and currently shown as **copy-able links** (admin shares them). Auto-email to arbitrary recipients needs a verified Resend domain (see below).

## Environment (`.env.local`, git-ignored — also set on Vercel prod+dev)
```
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY   # public, client-safe
NEXT_PUBLIC_SITE_URL=https://agrovio.io                   # used to build invite/reset links
RESEND_API_KEY                                            # server-only
SUPABASE_SERVICE_ROLE_KEY                                 # server-only — admin portal needs it
ADMIN_EMAILS=agroviobusiness@gmail.com                    # comma-separated allowlist for /admin
```
`.env.example` documents these. **Never commit `.env.local`.**

## Deploying
- **Via CLI:** `vercel --prod --yes --scope agroviobusiness-3730s-projects`
- **Or push to `main`** — GitHub → Vercel auto-deploy works (the client's account).
- **CRITICAL:** Hobby plan = **1 concurrent build**. Fire **one deploy at a time** and let it finish. Triggering several at once (e.g. a push + a CLI deploy together) jams the queue → deployments stick at `UNKNOWN` / 0ms. If that happens, delete the stuck deployments and run a single clean deploy. NEXT_PUBLIC/runtime env changes need a redeploy to take effect.
- **Rollback / recovery:** a bad prod deploy is reversible in one click — Vercel → Deployments → last good one → **Promote to Production**. Full incident steps (data loss, paused Free project, uptime monitor) are in **`docs/RUNBOOK.md`**.

## Rules / do-not
- **Never** commit secrets; service-role/secret keys are server-only (never `NEXT_PUBLIC`, never in a Client Component).
- **Never** link to `/admin` publicly or soften its gate — keep it 404-for-non-admins.
- **Don't** trim `public/assets/investor-santa-sofia.jpeg` — it's a designed gray card (trimming looks wrong). The feature mockups *were* trimmed (their source PNGs are mostly whitespace).
- **Don't** replace the producer/buyer/chat placeholders unless asked.
- Before using an unfamiliar Next 16 API, read `node_modules/next/dist/docs/` (it really does differ from older Next).

## Agent team (`.claude/agents/`)
Specialist subagents — see `.claude/agents/README.md`. **`agrovio-orchestrator`** plans/coordinates; **`agrovio-frontend` / `agrovio-backend` / `agrovio-database`** do the work; **`agrovio-security` reviews every change before it ships** (read-only — verdict must be SHIP). Build must pass and DB advisors must be clean before the security gate, and deploy **one at a time**. **At the end of each session, update `LESSONS.md` and the affected agent files / this guide** with anything new learned.

## Security posture
- **Headers** (`next.config.ts`): CSP, X-Frame-Options DENY, HSTS, nosniff, Referrer-Policy, Permissions-Policy.
- **Contact form**: honeypot field + per-IP rate limit (5/hour) via `public.rate_limit_hit` (atomic SECURITY DEFINER fn, called **service-role-only**, not exposed to anon). RLS insert-only on `invite_requests` (no PII readback).
- **Auth endpoints**: rate-limited by Supabase (GoTrue). Admin portal hidden (404 for non-admins). Service-role/secret keys are server-only.
- **Leaked-password protection** (advisor WARN) is **Pro-plan only** — *not available on Free*, and low priority here anyway (invite-only: admin-created accounts, no public signup, auth endpoints rate-limited by Supabase). On Free, instead raise the **min password length + required characters** under Auth → Providers → Email (the app's Zod already requires 8+). Public sign-ups are disabled.

## Manual tasks that CANNOT be done via code or the Supabase MCP
- **Supabase Auth config** (Site URL, email templates, SMTP): dashboard, or the Supabase **Management API with a Personal Access Token** (the MCP is scoped to DB/project, not GoTrue settings). Public sign-ups are already disabled.
- **Auto-emailing invites/resets to anyone**: needs a **verified domain in Resend** (DNS). Resend's onboarding domain only delivers to the account owner. Until then, the admin shares copy-able links.

See **LESSONS.md** for the full history of gotchas and how they were solved.
