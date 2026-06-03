import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { GreenHero } from "@/components/layout/green-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillLink } from "@/components/ui/pill-button";
import { Reveal } from "@/components/motion/reveal";
import { FeatureRow } from "@/components/sections/feature-row";
import leafMark from "@/public/assets/agrovio-leaf.png";
import heroLoadboard from "@/public/assets/buyer-hero-loadboard.png";
import pricingData from "@/public/assets/buyer-pricing-data.png";
import offers from "@/public/assets/buyer-offers.png";
import dealAccepted from "@/public/assets/buyer-deal-accepted.png";
import notifications from "@/public/assets/buyer-notifications.png";
import verifiedNetwork from "@/public/assets/buyer-verified-network.png";

export const metadata: Metadata = {
  alternates: { canonical: "/buyer" },
  title: "For Buyers",
  description:
    "Source verified produce with the grade, volume, and timing your business needs across Peru and LATAM.",
};

/* §2 coverage card — GrowCard pattern with an icon chip on top. */
function CoverageCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-sm sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        {icon}
      </span>
      <h3 className="mt-5 text-xl font-medium tracking-tight text-ink">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink/65">{children}</p>
    </div>
  );
}

/* §8 comparison data. */
const COMPARISON: ReadonlyArray<{
  dimension: string;
  traditional: string;
  agrovio: string;
}> = [
  {
    dimension: "Cost",
    traditional: "High — field visits & intermediaries",
    agrovio: "Subscription-based, no hidden fees",
  },
  {
    dimension: "Producer quality",
    traditional: "Unvetted, unknown history",
    agrovio: "Verified, trusted profiles",
  },
  {
    dimension: "Produce availability",
    traditional: "Only what you know",
    agrovio: "Real-time listings across Peru",
  },
  {
    dimension: "Geographic reach",
    traditional: "Local contacts only",
    agrovio: "Peru-wide, expanding to LATAM",
  },
];

function CrossMark() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-ink/30"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function CheckMark() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function BuyerPage() {
  return (
    <>
      {/* Hero */}
      <GreenHero>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            For agroexporters &amp; processors
          </p>
          <h1 className="mt-5 text-[2.75rem] font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Source Peru&rsquo;s verified harvest. Direct from the field.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            Whether you&rsquo;re sourcing at scale or looking for a new supplier,
            Agrovio gives you direct access to verified producers so you find the
            right harvest across Peru and LATAM.
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
            src={heroLoadboard}
            alt="The Agrovio buyer load board showing verified produce listings with grades, volumes, and live bid actions"
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="h-auto w-full rounded-2xl [filter:drop-shadow(0_28px_56px_rgba(7,40,21,0.35))]"
            quality={90}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </GreenHero>

      {/* §2 Coverage */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading tone="brand">
                Produce coverage at scale
              </SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Source produce for every crop type and grade, with direct access
                to verified producers across Peru and the rest of Latin America.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <CoverageCard
                title="Producers"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M14.5 14h1.5a4 4 0 0 1 4 4v1"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Verified growers ready to supply
              </CoverageCard>
              <CoverageCard
                title="Produce Types"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 21c0-6 0-9 0-12M12 9C12 5 9 3 4 3c0 5 2 8 6 8h2ZM12 13c0-3.5 2.5-6 7-6 0 4.5-2.5 6-6 6h-1Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Fruits &amp; vegetables, varieties
              </CoverageCard>
              <CoverageCard
                title="Availability"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                    <path
                      d="M12 7v5l3.5 2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Updated listings across harvest seasons
              </CoverageCard>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* §3 Pricing */}
      <Reveal>
        <FeatureRow
          image={pricingData}
          imageAlt="Agrovio's produce pricing panel showing verified rate ranges and an 8-week price trend for asparagus in Ica, Peru"
          imageSide="right"
          eyebrow="Agrovio Marketplace"
          heading="Access accurate produce pricing data"
          body="Real-time pricing from verified transactions — so you negotiate faster and protect your margin."
          bullets={[
            "Spot sourcing — find available produce instantly, on the go",
            "Season planning — plan procurement ahead of harvest with producer commitments",
            "Benchmark & negotiate — see market price ranges and negotiate directly through Agrovio Chat",
          ]}
        />
      </Reveal>

      {/* §4 Offers */}
      <Reveal>
        <FeatureRow
          image={offers}
          imageAlt="A buyer's sourcing request on Agrovio with multiple verified producers responding with offer prices"
          imageSide="left"
          eyebrow="Agrovio Marketplace"
          heading="Post once. Get multiple offers. Source instantly."
          body="Post your requirements once and get responses from verified producers instantly — no calls, no guesswork."
          bullets={[
            "Choose from multiple producer responses",
            "See certifications, regions, and transaction history for each producer",
            "Producers get instant alerts and respond fast",
          ]}
        />
      </Reveal>

      {/* §5 Chat */}
      <Reveal>
        <FeatureRow
          image={dealAccepted}
          imageAlt="A confirmed Agrovio deal for Grade A Palta Hass with a bid-accepted confirmation"
          imageSide="right"
          eyebrow="Agrovio Chat"
          heading="Communicate and bid in real time with producers on every deal"
          body="Add context to your sourcing request, negotiate price in real time, and confirm quality details before either side commits. Available in Spanish and English with instant translation."
        />
      </Reveal>

      {/* §6 Notifications */}
      <Reveal>
        <FeatureRow
          image={notifications}
          imageAlt="WhatsApp and in-app notifications alerting a buyer to newly listed produce that matches their sourcing preferences"
          imageSide="left"
          eyebrow="Never miss a harvest"
          heading="Set it once and let the produce come to you"
          body="Save your sourcing preferences by produce type, grade, region, and volume — then get notified instantly via WhatsApp or email when a producer lists exactly what you need."
          bullets={[
            "WhatsApp & email instant notifications",
            "Personalized alerts by produce type, grade, and region",
            "No irrelevant listings — only produce that fits your network",
          ]}
        />
      </Reveal>

      {/* §7 Verified network */}
      <Reveal>
        <FeatureRow
          image={verifiedNetwork}
          imageAlt="A verified Agrovio buyer profile showing company registration, MFA status, transaction history, and trust score"
          imageSide="right"
          eyebrow="Verified Network"
          heading="The only produce marketplace built and vetted for Peru & Latin America's agro market"
          body="So you don't have to build your supplier network from scratch."
          bullets={[
            "Verified producer profiles — growers with confirmed farm and business history",
            "Invoice verification — producers submit proof of transaction to build their seller history",
            "Ongoing trust monitoring — flags suspicious activity and protects both sides",
            "Agrovio Chat profiles — MFA-protected accounts so you always know who you're talking to",
          ]}
        />
      </Reveal>

      {/* §8 Stop Sourcing Blind — comparison */}
      <Reveal>
        <section className="py-12 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Stop Sourcing Blind</SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Traditional sourcing leaves you dependent on personal contacts and
                field visits. Agrovio is designed to simplify it — and it works.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-sm">
              {/* Desktop / tablet: semantic comparison table */}
              <table className="hidden w-full border-collapse text-left text-sm sm:table">
                <caption className="sr-only">
                  How sourcing on Agrovio compares to traditional sourcing,
                  across cost, producer quality, produce availability, and
                  geographic reach.
                </caption>
                <thead>
                  <tr className="border-b border-black/[0.06] bg-mist/40 font-medium">
                    <td className="p-5" />
                    <th scope="col" className="p-5 font-medium text-ink/55">
                      Traditional sourcing
                    </th>
                    <th
                      scope="col"
                      className="bg-brand/[0.06] p-5 font-medium text-brand-dark"
                    >
                      Agrovio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.dimension}
                      className={
                        i < COMPARISON.length - 1
                          ? "border-b border-black/[0.06]"
                          : undefined
                      }
                    >
                      <th
                        scope="row"
                        className="p-5 align-top font-medium text-ink"
                      >
                        {row.dimension}
                      </th>
                      <td className="p-5 align-top text-ink/55">
                        <span className="flex items-start gap-2.5">
                          <CrossMark />
                          <span>{row.traditional}</span>
                        </span>
                      </td>
                      <td className="bg-brand/[0.06] p-5 align-top text-ink">
                        <span className="flex items-start gap-2.5">
                          <CheckMark />
                          <span>{row.agrovio}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile: one stacked block per dimension */}
              <div className="divide-y divide-black/[0.06] sm:hidden">
                {COMPARISON.map((row) => (
                  <div key={row.dimension} className="p-6">
                    <h3 className="text-base font-medium text-ink">{row.dimension}</h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex items-start gap-2.5">
                        <CrossMark />
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-ink/40">
                            Traditional sourcing
                          </dt>
                          <dd className="mt-0.5 text-ink/60">{row.traditional}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-2xl bg-brand/[0.06] p-3">
                        <CheckMark />
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-brand-dark">
                            Agrovio
                          </dt>
                          <dd className="mt-0.5 text-ink">{row.agrovio}</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="pb-12 sm:pb-28">
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
      </Reveal>
    </>
  );
}
