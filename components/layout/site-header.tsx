"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PillLink } from "@/components/ui/pill-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { NAV_LINKS, NAV_LINKS_ES, ANNOUNCEMENT, ANNOUNCEMENT_ES } from "@/lib/content";
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

function Logo({ onClick, href }: { onClick?: () => void; href: string }) {
  return (
    <Link
      href={href}
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  const isAdmin = pathname?.startsWith("/admin");
  const isSpanish = pathname?.startsWith("/es");

  const navLinks = isSpanish ? NAV_LINKS_ES : NAV_LINKS;
  const announcement = isSpanish ? ANNOUNCEMENT_ES : ANNOUNCEMENT;
  const logoHref = isSpanish ? "/es" : "/";
  const loginLabel = isSpanish ? "Iniciar sesión" : "Login";
  const inviteLabel = isSpanish ? "Solicitar invitación" : "Request an Invite";

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (isAdmin) return null;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 [view-transition-name:site-header]">
      <div className="pointer-events-auto bg-black/20">
        <p className="px-4 py-2.5 text-center text-[13px] font-light text-white/95">
          {announcement}
        </p>
      </div>

      <Container className="pointer-events-auto">
        <nav className="flex items-center justify-between gap-4 py-4" aria-label="Primary">
          <Logo onClick={close} href={logoHref} />

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(LINK, pathname === l.href && "text-white")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Link href="/login" className={LINK}>
              {loginLabel}
            </Link>
            <PillLink href="/inviterequest" variant="black" size="sm">
              {inviteLabel}
            </PillLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded text-white md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="pointer-events-auto border-t border-white/10 bg-brand px-6 pb-6 pt-4 md:hidden">
          <ul className="space-y-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className={cn(LINK, "block text-base")}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link href="/login" onClick={close} className={cn(LINK, "text-base")}>
                {loginLabel}
              </Link>
            </div>
            <PillLink href="/inviterequest" variant="black" size="sm" className="w-full text-center">
              {inviteLabel}
            </PillLink>
          </div>
        </div>
      )}
    </header>
  );
}
