export const SITE_NAME = "DREAMit";

export const NAV_LINKS = [
  { label: "Du kender det", href: "#problemet" },
  { label: "Eksempler", href: "#eksempler" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Pakker", href: "#pakker" },
] as const;

export const CTA_PRIMARY = "BOOK ET MØDE";
export const CTA_SECONDARY = "SE PROCESSEN";
export const CTA_BANNER_LEAD = "START DIN DRØM";

/** Rækkefølge på primær CTA-banner: lead først, derefter handling */
export const CTA_BANNER_LABELS = [CTA_BANNER_LEAD, CTA_PRIMARY] as const;
export const CTA_BANNER_INTERVAL_MS = 3500;

/** Primær konvertering — direkte handling */
export const CTA_PRIMARY_HREF = "#kontakt";
/** Blød indgang — læs om processen før man booker */
export const CTA_SECONDARY_HREF = "#problemet";

export const COLORS = {
  black: "#05070D",
  white: "#FAFAF8",
  accent: "#4C3FD9",
} as const;

export const CONTACT_EMAIL = "hej@dreamit.dk";
