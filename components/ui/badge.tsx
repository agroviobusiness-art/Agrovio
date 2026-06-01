import { cn } from "@/lib/utils";

/** Small green pill label, e.g. "Invite-only network of growers & buyers". */
export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand-dark",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-brand-dark" aria-hidden />
      {children}
    </span>
  );
}

/** Uppercase eyebrow label, e.g. "AGROVIO MARKETPLACE". */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.18em] text-brand-dark",
        className
      )}
    >
      {children}
    </p>
  );
}
