alter table public.invite_requests
  add column if not exists status text not null default 'new';

comment on column public.invite_requests.status is 'Lead workflow status: new | accepted (set by admin portal).';
