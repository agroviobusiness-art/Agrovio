import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Green-gradient hero band sitting beneath the absolutely-positioned header.
 * The top padding clears the announcement bar + nav so content isn't hidden.
 */
export function GreenHero({
  className,
  containerClassName,
  children,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("bg-hero-gradient text-white", className)}>
      <Container className={cn("pt-32 pb-16 sm:pt-40 sm:pb-20", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
