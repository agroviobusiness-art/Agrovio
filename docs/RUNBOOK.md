# Agrovio — Recovery Runbook

Click-by-click recovery for the most likely incidents on this stack. Aimed at the
site owner — no terminal needed for the common cases.

> Accounts are the **client's** (Supabase + Vercel under agroviobusiness@gmail.com).
> See CLAUDE.md for the account/scope details.

---

## 1. A deploy broke the live site

**Symptom:** the site looks wrong or errors right after a change shipped.

**Fix — instant rollback (no code needed):**
1. Vercel → project **agrovio** → **Deployments**.
2. Find the last **good** deployment (the green one before the bad change).
3. Open its **⋯** menu → **Promote to Production** (Instant Rollback).
4. The previous good version is live again within seconds.

**Alternative (from code):** revert the bad commit on `main` and push — Vercel
auto-deploys the revert.

> Hobby plan runs **one build at a time**. Don't fire several deploys at once or
> they jam (deployments stick at `UNKNOWN`/0ms). See LESSONS.md for the unstick steps.

---

## 2. Lead / database data was lost or corrupted

- **Backups:** Supabase **Free** keeps **daily** automated backups.
- **Recovery point:** up to **~24h old** — Free has **no** point-in-time recovery
  (PITR is a Supabase Pro feature). This is an accepted limit at this data volume.

**Restore:**
1. Supabase → project → **Database → Backups**.
2. Pick the most recent daily backup → **Restore** → confirm.

**Second copy of leads:** every new invite request is also emailed to the team
(`lib/email.ts`), so recent lead *contents* usually also live in the inbox even
if the table is lost. The admin portal flags any lead whose notification email
failed to send (**⚠ email failed**) so those can be re-checked.

---

## 3. The site/DB stopped responding for no obvious reason

**Likely cause on Free:** Supabase pauses a project after ~7 days of **inactivity**.
A live public URL with normal traffic plus the uptime monitor below normally
prevents this.

**Fix:** Supabase → project → if paused, click **Restore project** (one click;
available for 90 days after the pause).

---

## 4. Catch problems before users do (set up once)

Add a free uptime monitor (e.g. **UptimeRobot** or **BetterStack** free tier):
- Monitor **https://agrovio.io** every ~5 minutes (`agrovio.vercel.app` stays attached during the transition).
- Alert by email (and/or Slack) on downtime.

This covers both "site down" and "DB paused", and the periodic ping also helps
keep the Free Supabase project from auto-pausing.

---

## Database schema

The full schema (tables, RLS policies, the rate-limit function) is
version-controlled in **`supabase/migrations/`**, so it can be rebuilt from code
if the Supabase project is ever lost or recreated. See `supabase/README.md`.
