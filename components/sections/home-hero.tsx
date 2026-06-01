import Image from "next/image";
import { GreenHero } from "@/components/layout/green-hero";
import { PillLink } from "@/components/ui/pill-button";
import heroMock from "@/public/assets/hero-loadboard.png";
import leafMark from "@/public/assets/agrovio-leaf.png";

export function HomeHero() {
  return (
    <GreenHero>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div>
          <h1 className="text-[2.75rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem]">
            <span className="block">Grow More.</span>
            <span className="block">Sell More.</span>
            <span className="block">Buy Faster.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
            Collaborate through our invite-only marketplace
          </p>
          <div className="mt-8">
            <PillLink href="/inviterequest" variant="white">
              <Image src={leafMark} alt="" className="h-5 w-auto" />
              Request an Invite
            </PillLink>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <Image
            src={heroMock}
            alt="The Agrovio load board with live produce listings and WhatsApp deal notifications"
            sizes="(max-width: 1024px) 100vw, 620px"
            className="h-auto w-full"
            quality={90}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      <p className="mt-10 text-sm text-white/80 sm:mt-14">
        Loved by +100 agro companies
      </p>
    </GreenHero>
  );
}
