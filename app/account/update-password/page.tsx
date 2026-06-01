import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthCard } from "@/components/layout/auth-card";
import { UpdatePasswordForm } from "@/components/forms/update-password-form";

export const metadata: Metadata = {
  title: "Set your password",
  robots: { index: false },
};

export default async function UpdatePasswordPage() {
  // Reachable only with a valid session — the /auth/confirm route signs the
  // user in (via the invite/reset token) before redirecting here.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?error=link");

  return (
    <AuthCard
      title="Set your password"
      subtitle={`Choose a password for ${user.email ?? "your account"}.`}
    >
      <UpdatePasswordForm />
    </AuthCard>
  );
}
