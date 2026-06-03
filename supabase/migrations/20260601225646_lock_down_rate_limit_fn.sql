-- The rate limiter is invoked server-side with the service-role key only,
-- so it must NOT be callable from the public REST API.
revoke execute on function public.rate_limit_hit(text, int, int) from anon, authenticated;
grant execute on function public.rate_limit_hit(text, int, int) to service_role;
