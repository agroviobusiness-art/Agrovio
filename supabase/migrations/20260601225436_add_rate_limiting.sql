-- Self-contained, atomic per-key rate limiter (no external service).
create table if not exists public.rate_limits (
  key text primary key,
  count int not null default 0,
  window_start timestamptz not null default now()
);

-- Locked down: only the SECURITY DEFINER function below may touch it.
alter table public.rate_limits enable row level security;
revoke all on table public.rate_limits from anon, authenticated;

-- Returns true if the hit is allowed (count within p_max for the rolling window),
-- false once the limit is exceeded. Atomic via INSERT ... ON CONFLICT.
create or replace function public.rate_limit_hit(
  p_key text,
  p_max int,
  p_window_seconds int
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  c int;
begin
  insert into public.rate_limits as r (key, count, window_start)
    values (p_key, 1, now())
  on conflict (key) do update set
    count = case
      when r.window_start < now() - make_interval(secs => p_window_seconds) then 1
      else r.count + 1
    end,
    window_start = case
      when r.window_start < now() - make_interval(secs => p_window_seconds) then now()
      else r.window_start
    end
  returning r.count into c;

  return c <= p_max;
end;
$$;

revoke all on function public.rate_limit_hit(text, int, int) from public;
grant execute on function public.rate_limit_hit(text, int, int) to anon, authenticated;
