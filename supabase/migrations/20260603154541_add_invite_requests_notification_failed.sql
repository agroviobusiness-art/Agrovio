-- Flag a lead row when it was saved but the team-notification email failed to
-- send, so the admin portal can surface "N leads where the email didn't send"
-- and the team can follow up. Set by the invite server action's email catch.
alter table public.invite_requests
  add column if not exists notification_failed boolean not null default false;

comment on column public.invite_requests.notification_failed is
  'True when the lead was saved but the team notification email failed to send (set by the invite server action).';
