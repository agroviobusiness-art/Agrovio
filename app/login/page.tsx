import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";
import { AuthCard } from "@/components/layout/auth-card";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your invite-only Agrovio account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your invite-only Agrovio account."
      footer={
        <>
          Don&apos;t have access?{" "}
          <Link
            href="/inviterequest"
            className="rounded font-medium text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Request an invite
          </Link>
        </>
      }
    >
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          That link is invalid or has expired. Log in below, or request a new
          reset link.
        </p>
      )}

      <LoginForm />

      <p className="mt-4 text-center text-sm">
        <Link
          href="/forgot-password"
          className="rounded text-ink/60 hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Forgot your password?
        </Link>
      </p>
    </AuthCard>
  );
}
