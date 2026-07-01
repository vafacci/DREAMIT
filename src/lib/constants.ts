export const SITE_NAME = "DREAMit";

export const NAV_LINKS = [
  { label: "Hvad vi gør", href: "#hvad-vi-goer" },
  { label: "Proces", href: "#proces" },
  { label: "Pakker", href: "#pakker" },
  { label: "Cases", href: "#cases" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const CTA_PRIMARY = "Book et møde";
export const CTA_SECONDARY = "Start din drøm";

/** Primær konvertering — 1:1 samtale via kontakt/booking */
export const CTA_PRIMARY_HREF = "#kontakt";
/** Blød indgang — læs om processen før man booker */
export const CTA_SECONDARY_HREF = "#proces";

export const COLORS = {
  black: "#000000",
  white: "#FFFFFF",
  accent: "#B86F5B",
} as const;
