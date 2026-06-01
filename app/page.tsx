import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { HomeHero } from "@/components/sections/home-hero";
import { StatCardRow } from "@/components/sections/stat-card";
import { FeatureRow } from "@/components/sections/feature-row";
import { InviteForm } from "@/components/forms/invite-form";
import bidCards from "@/public/assets/feature-bid-cards.png";
import whatsappCards from "@/public/assets/feature-whatsapp-cards.png";
import buyerBids from "@/public/assets/feature-buyer-bids.png";
import pricingChart from "@/public/assets/feature-pricing-chart.png";
import founderPhoto from "@/public/assets/founder-diego-torres.jpg";
import investorLogo from "@/public/assets/investor-santa-sofia.jpeg";
import southAmericaMap from "@/public/assets/south-america-map.jpg";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Statement */}
      <section className="py-20 sm:py-28">
        <Container>
          <p className="mx-auto max-w-4xl text-center text-3xl font-medium leading-tight tracking-tight text-ink/40 sm:text-[2.75rem] sm:leading-[1.15]">
            Turning every <span className="text-ink">harvest</span>, at every{" "}
            <span className="text-ink">grade</span>, into a business that works
            for <span className="text-ink">everyone</span>.
          </p>
        </Container>
      </section>

      {/* Capacity + stats */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading tone="brand">
              Access trusted Peru and LATAM capacity
            </SectionHeading>
            <p className="mt-4 text-lg text-ink/60">
              Work with a curated network of experts across agro commerce.
            </p>
          </div>
          <div className="mt-12">
            <StatCardRow
              stats={[
                { value: "22+", label: "Produce Varieties" },
                { value: "20+", label: "Regions" },
                { value: "150+", label: "Growers & Processors" },
              ]}
            />
          </div>
          <div className="mt-10 flex justify-center">
            <Badge>Invite-only network of growers &amp; buyers</Badge>
          </div>
        </Container>
      </section>

      {/* Feature rows */}
      <FeatureRow
        image={bidCards}
        imageAlt="Submit-bid card and counter-bid offer on Agrovio"
        imageSide="left"
        lead="Faster coverage means you can focus on increasing volume, building relationships and solving problems."
        heading="Connect & Negotiate faster. 24/7"
        bullets={[
          "List your harvest in minutes",
          "Connect with verified agro buyers",
          "Available across Latin America",
        ]}
      />

      <FeatureRow
        image={whatsappCards}
        imageAlt="WhatsApp deal notifications from Agrovio"
        imageSide="right"
        lead="Designed to handle the complexities of agriculture produce sourcing."
        heading="Built for Peru and Latin America’s Agro Market"
        bullets={[
          "WhatsApp Integrations",
          "Available in English and Spanish",
          "Produce listing with grade, volume, and pricing details",
        ]}
      />

      <FeatureRow
        image={buyerBids}
        imageAlt="Table of verified buyer bids on a produce listing"
        imageSide="left"
        heading="Unlock your network’s full potential"
        bullets={[
          "Centralize your offers and listings in one place",
          "Find new agro buyers and discover demand in your network you didn’t know existed",
        ]}
      />

      <FeatureRow
        image={pricingChart}
        imageAlt="Real-time produce pricing with rate range and 8-week trend"
        imageSide="right"
        heading="Access accurate produce pricing data"
        body="Price your harvest with data from verified marketplace transactions. Updated in real time and available instantly so you can negotiate faster, close better deals, and protect your margin."
      />

      {/* Mission band */}
      <section className="bg-hero-gradient py-20 text-white sm:py-28">
        <Container>
          <p className="mx-auto max-w-4xl text-center text-2xl font-medium leading-snug tracking-tight sm:text-[2rem] sm:leading-[1.3]">
            As Peru leads explosive growth in Latin American agro-exports,
            Agrovio is building software to simplify the entire produce sourcing
            process from growers to processors / agro-exporters — also known as
            acopio.
          </p>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading>Leadership Team</SectionHeading>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl items-center gap-8 sm:grid-cols-[280px_1fr] sm:gap-12">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={founderPhoto}
                alt="Diego Torres, Founder & CEO of Agrovio"
                sizes="(max-width: 640px) 100vw, 280px"
                className="h-auto w-full"
                quality={90}
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-dark">
                Founder &amp; CEO
              </p>
              <p className="mt-2 text-3xl font-medium tracking-tight text-ink">
                Diego Torres
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/60">
                Building the sourcing infrastructure for Peru and Latin America’s
                agro-export economy — from growers to processors and exporters.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Investors */}
      <section id="investors" className="scroll-mt-28 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading>Our investors</SectionHeading>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Link
              href="https://stasofia.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Santa Sofia del Sur"
              className="block overflow-hidden rounded-2xl ring-1 ring-black/[0.06] transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image
                src={investorLogo}
                alt="Santa Sofia del Sur"
                sizes="340px"
                className="h-auto w-[300px] sm:w-[340px]"
              />
            </Link>
            <span className="text-sm text-ink/55">Santa Sofia del Sur</span>
          </div>
        </Container>
      </section>

      {/* Invite form */}
      <section id="invite" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading>
                Request an invite to join Agrovio today.
              </SectionHeading>
              <p className="mt-4 text-lg text-ink/60">
                Tell us a bit about your operation and we’ll be in touch.
              </p>
              <Image
                src={southAmericaMap}
                alt="Agrovio operates across Peru and Latin America"
                sizes="(max-width: 1024px) 60vw, 440px"
                className="mt-10 w-full max-w-xs sm:max-w-sm lg:max-w-md"
              />
            </div>
            <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm sm:p-10">
              <InviteForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
