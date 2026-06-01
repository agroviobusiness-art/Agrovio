import Link from "next/link";
import Image from "next/image";
import leafMark from "@/public/assets/agrovio-leaf.png";

/** Centered white card on the green gradient — shared by login / forgot / set-password. */
export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="bg-hero-gradient">
      <div className="flex min-h-screen items-center justify-center px-5 py-32">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10">
          <div className="mb-8 text-center">
            <Link
              href="/"
              aria-label="Agrovio home"
              className="inline-flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image src={leafMark} alt="" className="h-8 w-auto" />
              <span className="text-2xl font-medium tracking-tight text-ink">
                agrovio
              </span>
            </Link>
            <h1 className="mt-6 text-2xl font-medium tracking-tight text-ink">
              {title}
            </h1>
            {subtitle && <p className="mt-2 text-sm text-ink/60">{subtitle}</p>}
          </div>

          {children}

          {footer && (
            <div className="mt-6 text-center text-sm text-ink/60">{footer}</div>
          )}
        </div>
      </div>
    </section>
  );
}
