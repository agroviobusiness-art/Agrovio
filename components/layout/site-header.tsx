"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PillLink } from "@/components/ui/pill-button";
import { NAV_LINKS, ANNOUNCEMENT } from "@/lib/content";
import { cn } from "@/lib/utils";
import leafMark from "@/public/assets/agrovio-leaf.png";

const LINK =
  "rounded text-[15px] text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Agrovio home"
      className="flex shrink-0 items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <Image src={leafMark} alt="" className="h-8 w-auto sm:h-9" loading="eager" />
      <span className="text-[1.65rem] font-medium tracking-tight text-white sm:text-3xl">
        agrovio
      </span>
    </Link>
  );
}

/**
 * Transparent header overlaid on each page's green hero (matches the Framer
 * design). Absolutely positioned so the gradient shows through behind it; the
 * hero sections add top padding to clear it. Collapses to a drawer on mobile.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  // Close the drawer on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="bg-black/20">
        <p className="px-4 py-2.5 text-center text-[13px] font-light text-white/95">
          {ANNOUNCEMENT}
        </p>
      </div>

      <Container>
        <nav className="flex items-center justify-between gap-4 py-4" aria-label="Primary">
          <Logo onClick={close} />

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(LINK, pathname === l.href && "text-white")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/login" className={LINK}>
              Login
            </Link>
            <PillLink href="/inviterequest" variant="black" size="sm">
              Request an Invite
            </PillLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </Container>

      {open && (
        <Container className="md:hidden">
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mb-4 rounded-2xl bg-brand-deep/95 p-4 shadow-xl ring-1 ring-white/10 backdrop-blur"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="rounded-lg px-3 py-3 text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3 border-t border-white/15 pt-4">
              <Link
                href="/login"
                onClick={close}
                className="rounded-lg px-3 py-3 text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Login
              </Link>
              <PillLink
                href="/inviterequest"
                onClick={close}
                variant="white"
                className="w-full"
              >
                Request an Invite
              </PillLink>
            </div>
          </nav>
        </Container>
      )}
    </header>
  );
}
