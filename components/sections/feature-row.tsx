import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Eyebrow } from "@/components/ui/badge";
import { PillLink } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-ink/70">{children}</span>
    </li>
  );
}

export type FeatureRowProps = {
  image: StaticImageData;
  imageAlt: string;
  /** Which side the mockup sits on for desktop (defaults to right). */
  imageSide?: "left" | "right";
  eyebrow?: string;
  heading: React.ReactNode;
  lead?: string;
  bullets?: string[];
  /** Extra paragraph rendered after the lead (used when there are no bullets). */
  body?: string;
  cta?: { label: string; href: string };
  className?: string;
};

export function FeatureRow({
  image,
  imageAlt,
  imageSide = "right",
  eyebrow,
  heading,
  lead,
  bullets,
  body,
  cta,
  className,
}: FeatureRowProps) {
  const imageLeft = imageSide === "left";

  return (
    <section className={cn("py-12 sm:py-24", className)}>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Visual — the product mockup, floated large on white like the
              reference (the trimmed PNGs carry their own soft shadow). */}
          <div className={cn("order-1", imageLeft ? "lg:order-1" : "lg:order-2")}>
            <Image
              src={image}
              alt={imageAlt}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="h-auto w-full [filter:drop-shadow(0_24px_48px_rgba(15,81,40,0.10))]"
              quality={90}
            />
          </div>

          {/* Copy */}
          <div className={cn("order-2", imageLeft ? "lg:order-2" : "lg:order-1")}>
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            {lead && <p className="mb-4 text-base text-ink/55">{lead}</p>}
            <SectionHeading tone="brand">{heading}</SectionHeading>
            {body && <p className="mt-5 text-lg leading-relaxed text-ink/65">{body}</p>}
            {bullets && bullets.length > 0 && (
              <ul className="mt-7 space-y-4 text-base">
                {bullets.map((b) => (
                  <CheckBullet key={b}>{b}</CheckBullet>
                ))}
              </ul>
            )}
            {cta && (
              <div className="mt-8">
                <PillLink href={cta.href} variant="green">
                  {cta.label}
                </PillLink>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
