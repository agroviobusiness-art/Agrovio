/** Shared, site-wide content. Page-specific copy lives in its section. */

export const SITE = {
  name: "Agrovio",
  email: "agroviobusiness@gmail.com",
  domain: "agrovio.io",
  description:
    "Agrovio is an invite-only B2B marketplace connecting agro-produce growers with verified buyers across Peru and Latin America.",
};

export const ANNOUNCEMENT =
  "Our next FREE Peru 101 webinar is June 28th at 10AM CST.";

export const ANNOUNCEMENT_ES =
  "Nuestro próximo webinar GRATUITO Perú 101 es el 28 de junio a las 10AM CST.";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Overview", href: "/" },
  { label: "Producer", href: "/producer" },
  { label: "Buyer", href: "/buyer" },
  { label: "Agrovio Chat", href: "/chat" },
];

export const NAV_LINKS_ES: { label: string; href: string }[] = [
  { label: "Inicio", href: "/es" },
  { label: "Productor", href: "/es/producer" },
  { label: "Comprador", href: "/es/buyer" },
  { label: "Agrovio Chat", href: "/chat" },
];

export const FOOTER = {
  navigation: [
    { label: "Company", href: "/" },
    { label: "Leadership", href: "/#leadership" },
    { label: "Investors", href: "/#investors" },
  ],
  company: {
    name: "Agrovio, Co.",
    addressLine: "Jr. Jose Dionisio Anchorena 433, Lima, Lima, 15076",
    country: "Peru",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/agrovio_co" },
    { label: "X", href: "https://x.com" },
  ],
};

export const FOOTER_ES = {
  navigation: [
    { label: "Empresa", href: "/es" },
    { label: "Liderazgo", href: "/es#leadership" },
    { label: "Inversores", href: "/es#investors" },
  ],
  company: {
    name: "Agrovio, Co.",
    addressLine: "Jr. Jose Dionisio Anchorena 433, Lima, Lima, 15076",
    country: "Perú",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/agrovio_co" },
    { label: "X", href: "https://x.com" },
  ],
  columnTitles: {
    company: "Detalles de la empresa",
    navigation: "Navegación",
    follow: "Síguenos",
  },
  tagline: "Marketplace agrícola solo por invitación · Perú y LATAM",
  copyright: "©2026 Agrovio",
};

/** Invite-form select options. */
export const COUNTRIES = [
  "Peru",
  "Chile",
  "Colombia",
  "Ecuador",
  "Bolivia",
  "Mexico",
  "Brazil",
  "Argentina",
  "United States",
  "Other",
];

export const COUNTRIES_ES = [
  "Perú",
  "Chile",
  "Colombia",
  "Ecuador",
  "Bolivia",
  "México",
  "Brasil",
  "Argentina",
  "Estados Unidos",
  "Otro",
];

export const REFERRAL_SOURCES = [
  "Search engine",
  "Social media",
  "Referral",
  "Event or webinar",
  "News or article",
  "Other",
];

export const REFERRAL_SOURCES_ES = [
  "Motor de búsqueda",
  "Redes sociales",
  "Referido",
  "Evento o webinar",
  "Noticias o artículo",
  "Otro",
];
