import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FOOTER, SITE } from "@/lib/content";
import logoWhite from "@/public/assets/agrovio-logo-white.png";

const LINK =
  "rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function SocialIcon({ label }: { label: string }) {
  if (label.toLowerCase() === "instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  // X / Twitter
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
        {title}
      </h3>
      <div className="mt-4 space-y-2 text-sm text-white/90">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src={logoWhite} alt="Agrovio" className="h-9 w-auto sm:h-10" />
            <a href={`mailto:${SITE.email}`} className={`mt-5 inline-block text-sm text-white/90 ${LINK}`}>
              {SITE.email}
            </a>
          </div>

          <FooterColumn title="Company Details">
            <p>{FOOTER.company.name}</p>
            <p className="leading-relaxed text-white/80">{FOOTER.company.addressLine}</p>
            <p className="text-white/80">{FOOTER.company.country}</p>
          </FooterColumn>

          <FooterColumn title="Navigation">
            <ul className="space-y-2">
              {FOOTER.navigation.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className={LINK}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Follow">
            <div className="flex items-center gap-3">
              {FOOTER.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ${LINK}`}
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/20 pt-6 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>©2026 {SITE.name}</p>
          <p className="text-white/70">Invite-only agro-produce marketplace · Peru &amp; LATAM</p>
        </div>
      </Container>
    </footer>
  );
}
