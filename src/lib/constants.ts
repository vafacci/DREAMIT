export const SITE_NAME = "DREAMit";

/** Altid synlige i header-baren */
export const HEADER_QUICK_LINKS = [
  { label: "PAKKER", href: "#pakker" },
  { label: "EKSEMPLER", href: "#eksempler" },
] as const;

/** Sektioner i menu-overlay */
export const MENU_SECTION_LINKS = [
  { label: "START", href: "#start" },
  { label: "DU KENDER DET", href: "#problemet" },
  { label: "EKSEMPLER", href: "#eksempler" },
  { label: "PAKKER", href: "#pakker" },
  { label: "KONTAKT", href: "#kontakt" },
] as const;

/** Footer og andre steder der skal vise fuld navigation */
export const NAV_LINKS = MENU_SECTION_LINKS;

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
