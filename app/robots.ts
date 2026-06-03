import type { MetadataRoute } from "next";

// Built off NEXT_PUBLIC_SITE_URL so the Sitemap + host follow the canonical
// origin (agrovio.io). NOTE: /admin is deliberately NOT listed — it 404s for
// non-admins and is noindex; naming it in a public robots.txt would only
// advertise that the hidden portal exists.
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrovio.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/welcome"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
