# Agrovio agent team

Project subagents (Claude Code auto-discovers these). Invoke via the Task/Agent tool with the matching `subagent_type`, or let `agrovio-orchestrator` plan the dispatch.

| Agent | Role | Tools |
|---|---|---|
| **agrovio-orchestrator** | Plans a task, dispatches specialists, enforces the gates | full |
| **agrovio-frontend** | UI, components, responsive, a11y, Framer fidelity | full |
| **agrovio-backend** | Server actions, auth flows, Supabase clients, email, validation, rate limiting | full |
| **agrovio-database** | Schema, migrations, RLS, RPCs, advisors (client's Supabase) | full |
| **agrovio-security** | **Reviews every change** before it ships (read-only) | Read, Grep, Glob, Bash |

## Operating rules
1. **Security reviews every change.** No code or DB change ships without an `agrovio-security` pass (verdict SHIP). It's read-only, so it advises; the owning specialist fixes.
2. **One deploy at a time.** Hobby plan = a single concurrent build; parallel deploys jam the queue (see `LESSONS.md`).
3. **Client's accounts only.** Supabase / Vercel / GitHub all under `agroviobusiness@gmail.com` — never a personal account.
4. **Build must pass** (`npm run build`) and **DB advisors must be clean** (`get_advisors`) before the security gate.

## Keep them updated (every session)
At the end of each session, update:
- `LESSONS.md` — new gotchas, patterns, fixed mistakes.
- The affected agent files here + `CLAUDE.md` — if conventions, structure, env, or tools changed.

This keeps the team's knowledge current so the next session starts sharp. The agents themselves read `CLAUDE.md` + `LESSONS.md` on every run.
