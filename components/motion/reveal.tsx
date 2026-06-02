"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Scroll-in reveal. Renders a wrapper <div data-reveal> that the CSS hides
 * (fade + small rise) until it scrolls into view, at which point we set
 * `data-shown` and the CSS transitions it in.
 *
 * Robustness:
 * - The hidden state in globals.css is gated on `(scripting: enabled)`, so with
 *   JavaScript off the content is simply visible — markup is unchanged, so SEO
 *   and screen readers are unaffected.
 * - Reduced-motion users (or browsers without IntersectionObserver) get the
 *   content immediately, with no animation.
 *
 * Stagger a group by passing e.g. `className="[--reveal-delay:80ms]"` — a
 * Tailwind arbitrary property, so it lands in the stylesheet (no inline style).
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      {...(shown ? { "data-shown": "" } : {})}
      className={className}
    >
      {children}
    </div>
  );
}
