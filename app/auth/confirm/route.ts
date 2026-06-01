import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Handles invite + password-reset email links. Supabase emails point here with
 * a `token_hash` and `type`; we verify it (which sets the session cookie), then
 * forward the user to set their password.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // Open-redirect guard: collapse `next` to a same-origin pathname.
  const rawNext = searchParams.get("next") ?? "/account/update-password";
  let next = "/account/update-password";
  try {
    next = new URL(rawNext, origin).pathname || next;
  } catch {
    next = "/account/update-password";
  }

  if (token_hash && type) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      redirect(next);
    }
  }

  redirect("/login?error=link");
}
