import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type PillVariant = "black" | "white" | "green" | "outlineLight";
export type PillSize = "md" | "sm";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:opacity-60 disabled:pointer-events-none";

const VARIANTS: Record<PillVariant, string> = {
  black: "bg-ink text-white hover:bg-black focus-visible:ring-offset-transparent",
  white: "bg-white text-ink shadow-sm hover:bg-white/90 focus-visible:ring-offset-transparent",
  green: "bg-brand text-white hover:bg-brand-dark",
  outlineLight: "border border-white/70 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-transparent",
};

const SIZES: Record<PillSize, string> = {
  md: "px-6 py-3 text-[15px]",
  sm: "px-5 py-2.5 text-sm",
};

export function pillClasses(
  variant: PillVariant = "black",
  size: PillSize = "md",
  className?: string
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type PillLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: PillVariant;
  size?: PillSize;
};

export function PillLink({
  variant,
  size,
  className,
  children,
  ...props
}: PillLinkProps) {
  return (
    <Link className={pillClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type PillButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: PillVariant;
  size?: PillSize;
};

export function PillButton({
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: PillButtonProps) {
  return (
    <button type={type} className={pillClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
