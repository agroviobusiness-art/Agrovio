import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/forms/login-form";
import leafMark from "@/public/assets/agrovio-leaf.png";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your invite-only Agrovio account.",
};

export default function LoginPage() {
  return (
    <section className="bg-hero-gradient">
      <div className="flex min-h-screen items-center justify-center px-5 py-32">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Agrovio home">
              <Image src={leafMark} alt="" className="h-8 w-auto" />
              <span className="text-2xl font-medium tracking-tight text-ink">
                agrovio
              </span>
            </Link>
            <h1 className="mt-6 text-2xl font-medium tracking-tight text-ink">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-ink/60">
              Log in to your invite-only Agrovio account.
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-ink/60">
            Don’t have access?{" "}
            <Link
              href="/inviterequest"
              className="rounded font-medium text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Request an invite
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
