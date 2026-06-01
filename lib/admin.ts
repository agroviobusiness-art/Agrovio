import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Comma-separated allowlist of admin emails (defaults to the client's). */
const ADMIN_EMAILS = (
  process.env.ADMIN_EMAILS ?? "agroviobusiness@gmail.com"
)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Gate for the admin portal. Returns the admin user, or 404s for everyone
 * else — including signed-in non-admins and anonymous visitors — so the portal
 * is undiscoverable (no redirect that would hint it exists).
 * Call this in every admin layout/page AND inside admin actions (server actions
 * are reachable by direct POST).
 */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) notFound();

  return user;
}
