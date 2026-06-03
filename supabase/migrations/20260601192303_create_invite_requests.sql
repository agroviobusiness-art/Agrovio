create table if not exists public.invite_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text,
  phone text,
  company text,
  job_title text,
  role text,
  country text,
  referral_source text,
  created_at timestamptz not null default now()
);

comment on table public.invite_requests is 'Invite-request / contact submissions from the Agrovio marketing site.';

alter table public.invite_requests enable row level security;

-- Public contact form: anyone may INSERT a submission, but no one with the
-- public (anon) key may SELECT/UPDATE/DELETE. Staff read rows via the dashboard
-- (service role bypasses RLS). This protects submitted PII from public reads.
create policy "Anyone can submit an invite request"
  on public.invite_requests
  for insert
  to anon, authenticated
  with check (true);
