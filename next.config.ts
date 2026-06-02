import type { NextConfig } from "next";

// Content-Security-Policy tuned for Next 16 (App Router) + Supabase:
// - 'unsafe-inline' on script/style is required because Next injects inline
//   hydration scripts and Tailwind/React inject inline styles (no nonce setup).
// - data:/blob: img covers next/image blur placeholders + optimized output.
// - connect-src allows the Supabase project origin (defensive; auth/inserts
//   actually go through server actions on 'self').
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    // Opt into React's <ViewTransition> so client-side navigations animate via
    // the native View Transitions API (see components/motion/page-transition.tsx
    // + the ::view-transition rules in app/globals.css). Degrades gracefully:
    // browsers without support just swap pages instantly.
    viewTransition: true,
  },
  images: {
    // Next 16 requires an explicit qualities allow-list; we use the default 75
    // plus 90 for the crisp product mockups + hero.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
