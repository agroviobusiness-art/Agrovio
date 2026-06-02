import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { GreenHero } from "@/components/layout/green-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillLink } from "@/components/ui/pill-button";
import { StatCardRow } from "@/components/sections/stat-card";
import { FeatureRow } from "@/components/sections/feature-row";
import leafMark from "@/public/assets/agrovio-leaf.png";
import heroListings from "@/public/assets/producer-hero-listings.png";
import buyerOffers from "@/public/assets/producer-buyer-offers.png";
import chatThread from "@/public/assets/producer-chat.png";
import notifications from "@/public/assets/producer-notifications.png";
import verifiedProfile from "@/public/assets/producer-verified-profile.png";

export const metadata: Metadata = {
  title: "For Producers",
  description:
    "Sell your harvest to the right buyer. Agrovio connects producers of every size with verified processors and agro-exporters across Peru and Latin America.",
};

function GrowCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-sm sm:p-8">
      <h3 className="text-xl font-medium tracking-tight text-ink">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink/65">{children}</p>
    </div>
  );
}

export default function ProducerPage() {
  return (
    <>
      {/* Hero */}
      <GreenHero>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            For small, medium &amp; large producers
          </p>
          <h1 className="mt-5 text-[2.75rem] font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Start selling to the right buyer. Today.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            Whether you farm 1 hectare or 100+, Agrovio connects you with
            processors and agro-exporters looking for exactly what you grow.
          </p>
          <div className="mt-8 flex justify-center">
            <PillLink href="/inviterequest" variant="white">
              <Image src={leafMark} alt="" className="h-5 w-auto" />
              Request an Invite
            </PillLink>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
          <Image
            src={heroListings}
            alt="The Agrovio producer dashboard showing harvest listings with live buyer offers"
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="h-auto w-full rounded-2xl [filter:drop-shadow(0_28px_56px_rgba(7,40,21,0.35))]"
            quality={90}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </GreenHero>

      {/* Marketplace + stats */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading tone="brand">
              Peru&rsquo;s and Latin America&rsquo;s Agro Produce Marketplace
            </SectionHeading>
            <p className="mt-4 text-lg text-ink/60">
              List your harvest and get direct access to verified agro buyers,
              exporters and processors actively looking for your produce.
            </p>
          </div>
          <div className="mt-12">
            <StatCardRow
              stats={[
                {
                  value: "#1",
                  label: "Peru",
                  description: "In global blueberry and asparagus exports",
                },
                {
                  value: "$12.8B",
                  label: "Market",
                  description: "Peru agro-export market for 2024",
                },
                {
                  value: "2.2M+",
                  label: "Farms",
                  description: "Small & medium-size farms in Peru",
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* List once → multiple offers */}
      <FeatureRow
        image={buyerOffers}
        imageAlt="A produce listing on Agrovio with competing verified buyer offers"
        imageSide="right"
        eyebrow="Agrovio Marketplace"
        heading="List once. Get multiple offers. Close faster."
        body="List your harvest with grade, volume, pricing, and region — and immediately connect with verified buyers that want your produce. No more waiting for someone to show up at your farm."
        bullets={[
          "Choose from multiple buyer offers",
          "See buyer profile, certifications, and purchase history",
          "Buyers get instant alerts and respond fast",
        ]}
      />

      {/* Chat */}
      <FeatureRow
        image={chatThread}
        imageAlt="A bilingual buyer and producer negotiating a deal inside Agrovio Chat"
        imageSide="left"
        eyebrow="Agrovio Chat"
        heading="Communicate with buyers directly on every deal"
        body="Add context to your listing, negotiate price in real time, and show buyers what makes your harvest the right choice — before either side commits. Available in Spanish and English."
      />

      {/* Notifications */}
      <FeatureRow
        image={notifications}
        imageAlt="WhatsApp and in-app notifications alerting a producer to new buyer demand"
        imageSide="right"
        eyebrow="Never miss a buyer"
        heading="Set it once and let the buyers come to you"
        body="Save your produce preferences, harvest seasons, and regions — then get notified instantly via WhatsApp or email when a buyer is looking for exactly what you grow."
        bullets={[
          "WhatsApp & email instant notifications",
          "Personalized alerts by produce type, grade, and region",
          "No spam — only relevant buyer requests",
        ]}
      />

      {/* Verified network */}
      <FeatureRow
        image={verifiedProfile}
        imageAlt="A verified Agrovio producer profile with SENASA registration and trust score"
        imageSide="left"
        eyebrow="Verified Network"
        heading="The only produce marketplace built and vetted for Latin America's agro market"
        body="So you don't have to find buyers from scratch."
        bullets={[
          "Verified buyer profiles — exporters and processors with confirmed business history",
          "Invoice verification — submit proof of transaction to build your seller profile and history",
          "Ongoing trust monitoring — flags suspicious activity and protects both sides",
          "Agrovio Chat profiles — MFA-protected accounts so you always know who you're talking to",
        ]}
      />

      {/* Grow cards */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading>Grow Your Agro Business</SectionHeading>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <GrowCard title="Grow Your Buyer Base">
              Access exporters and processors in your region — buyers who
              actually compete for your produce.
            </GrowCard>
            <GrowCard title="Build a competitive edge">
              Start now. Build the buyer relationships, market knowledge, and
              pricing power your competitors don&rsquo;t have.
            </GrowCard>
            <GrowCard title="Become the producer they need">
              Consistent quality, transparent listings, and verified history make
              you the go-to supplier buyers keep coming back to.
            </GrowCard>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-hero-gradient px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <SectionHeading tone="white">Join Agrovio today</SectionHeading>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              One platform, priced to grow with your business.
            </p>
            <div className="mt-8 flex justify-center">
              <PillLink href="/inviterequest" variant="white">
                Get started
              </PillLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
