import type { MetadataRoute } from "next";

// Public, indexable marketing routes only — auth/admin/utility pages are
// excluded. URLs are built off NEXT_PUBLIC_SITE_URL so every <loc> is on the
// canonical origin (agrovio.io).
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrovio.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/producer", "/buyer", "/chat", "/inviterequest"];
  return routes.map((path): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${path || "/"}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
