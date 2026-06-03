# Supabase schema (version-controlled)

These migrations mirror the **remote** Agrovio Supabase project
(ref `xlyjtnctvmlqwyxjisbn`) so the schema — tables, RLS policies, and the
rate-limit function — lives in git and can be code-reviewed and rebuilt, not
just in the live database.

## Files

`migrations/<timestamp>_<name>.sql`, applied in filename order:

1. `…_create_invite_requests.sql` — leads table + insert-only RLS.
2. `…_harden_invite_requests_insert_policy.sql` — well-formed `WITH CHECK`.
3. `…_add_invite_requests_status.sql` — lead workflow `status` column.
4. `…_add_rate_limiting.sql` — `rate_limits` table + atomic `rate_limit_hit()` (SECURITY DEFINER).
5. `…_lock_down_rate_limit_fn.sql` — restrict `rate_limit_hit` EXECUTE to `service_role`.
6. `…_add_invite_requests_notification_failed.sql` — flag leads whose notification email failed.

## Applying changes

The Supabase CLI is not required just to read these. To apply going forward:

```bash
# one-time
supabase link --project-ref xlyjtnctvmlqwyxjisbn
# apply any new migration files to the remote project
supabase db push
```

Or paste the SQL in the Supabase dashboard SQL editor. **Always** add a new
timestamped file here for any schema change **and** apply it to the remote
project, so git and the live database stay in sync.
