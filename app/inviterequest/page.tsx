import type { Metadata } from "next";
import { GreenHero } from "@/components/layout/green-hero";
import { Container } from "@/components/ui/container";
import { InviteForm } from "@/components/forms/invite-form";

export const metadata: Metadata = {
  alternates: { canonical: "/inviterequest" },
  title: "Request an Invite",
  description:
    "Request an invite to join Agrovio — the invite-only B2B marketplace connecting agro-produce growers and verified buyers across Peru and LATAM.",
};

export default function InviteRequestPage() {
  return (
    <>
      <GreenHero>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">
            Request an Invite
          </h1>
          <p className="mt-5 text-lg text-white/90">
            Join the invite-only network connecting growers with verified buyers
            across Peru and Latin America.
          </p>
        </div>
      </GreenHero>

      <section className="bg-mist/40 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm sm:p-10">
            <InviteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
