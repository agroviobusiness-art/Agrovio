drop policy if exists "Anyone can submit an invite request" on public.invite_requests;

-- Public submissions are allowed, but the row must be well-formed: a plausible
-- email is required and free-text fields are length-capped to block abuse
-- payloads. This keeps RLS meaningful (not "always true") and acts as a second
-- layer of validation behind the app's Zod schema.
create policy "Anyone can submit a well-formed invite request"
  on public.invite_requests
  for insert
  to anon, authenticated
  with check (
    email is not null
    and char_length(email) between 3 and 255
    and position('@' in email) > 1
    and char_length(coalesce(first_name, '')) <= 120
    and char_length(coalesce(last_name, '')) <= 120
    and char_length(coalesce(company, '')) <= 200
    and char_length(coalesce(job_title, '')) <= 200
    and char_length(coalesce(phone, '')) <= 60
    and char_length(coalesce(country, '')) <= 120
    and char_length(coalesce(referral_source, '')) <= 600
    and (role is null or role in ('Producer', 'Buyer'))
  );
