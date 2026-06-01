import { cn } from "@/lib/utils";

type Tone = "ink" | "brand" | "white";

const TONES: Record<Tone, string> = {
  ink: "text-ink",
  brand: "text-brand",
  white: "text-white",
};

/** H2 section title — Space Grotesk weight 500, ~42px on desktop. */
export function SectionHeading({
  as: Tag = "h2",
  tone = "ink",
  className,
  children,
}: {
  as?: "h2" | "h3";
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-medium tracking-tight text-[2rem] leading-[1.12] sm:text-[2.625rem]",
        TONES[tone],
        className
      )}
    >
      {children}
    </Tag>
  );
}
