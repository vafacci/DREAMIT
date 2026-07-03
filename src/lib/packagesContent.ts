export const PACKAGES_HEADER = {
  label: "Pakker",
  title: "En pakke der passer til dig",
  subtitle: "50% ved opstart — resten først når din webshop sælger.",
};

export const PACKAGES = [
  {
    name: "Helhed",
    tagline: "Fra idé til salg",
    fullPrice: "28.500 kr.",
    upfrontPrice: "14.250 kr.",
    badge: "Anbefalet",
    features: [
      "Brand & rådgivning",
      "Firma & bankkonto",
      "Webshop & betaling",
      "Marketing & launch",
    ],
    highlighted: true,
  },
  {
    name: "Webshop",
    tagline: "Kun shoppen",
    fullPrice: "12.500 kr.",
    upfrontPrice: "6.250 kr.",
    badge: "Standard",
    features: ["Webshop & betaling", "Klar struktur", "Klar til launch"],
    highlighted: false,
  },
] as const;
