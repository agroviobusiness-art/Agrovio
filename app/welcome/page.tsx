import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logoutAction } from "@/app/actions/auth";
import { isAdminEmail } from "@/lib/admin";
import { PillLink, PillButton } from "@/components/ui/pill-button";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false },
};

export default async function WelcomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Invite-only: no valid session means you can't be here.
  if (!user) redirect("/login");

  return (
    <section className="bg-hero-gradient">
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-32 text-center text-white">
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
          You’re in.
        </h1>
        <p className="mt-5 max-w-md text-lg text-white/90">
          Signed in as {user.email}. The Agrovio marketplace is launching soon —
          we’ll email you the moment your dashboard is ready.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {isAdminEmail(user.email) && (
            <PillLink href="/admin" variant="white">
              Open admin portal
            </PillLink>
          )}
          <PillLink href="/" variant={isAdminEmail(user.email) ? "outlineLight" : "white"}>
            Back to home
          </PillLink>
          <form action={logoutAction}>
            <PillButton type="submit" variant="outlineLight">
              Sign out
            </PillButton>
          </form>
        </div>
      </div>
    </section>
  );
}
