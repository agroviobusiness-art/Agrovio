import { GreenHero } from "@/components/layout/green-hero";
import { PillLink } from "@/components/ui/pill-button";

export function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <GreenHero containerClassName="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
        {eyebrow}
      </p>
      <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-white/90">{description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <PillLink href="/inviterequest" variant="white">
          Request an Invite
        </PillLink>
        <PillLink href="/" variant="outlineLight">
          Back to home
        </PillLink>
      </div>
    </GreenHero>
  );
}
