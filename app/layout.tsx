import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE } from "@/lib/content";

// Space Grotesk is a variable font, so we omit `weight` and expose every axis
// value (we use 400/500/700) through a single CSS variable consumed by Tailwind.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agrovio.io"),
  title: {
    default: "Agrovio — Grow More. Sell More. Buy Faster.",
    template: "%s | Agrovio",
  },
  description: SITE.description,
  openGraph: {
    title: "Agrovio — Grow More. Sell More. Buy Faster.",
    description: SITE.description,
    type: "website",
    locale: "en_US",
    siteName: "Agrovio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
