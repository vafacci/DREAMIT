export const PACKAGES_HEADER = {
  label: "Pakker",
  title: "Vælg pakke",
  lead: "En pakke der passer til dig",
  subtitle: "50% ved opstart — resten først når din webshop sælger.",
};

export const PACKAGES = [
  {
    name: "Helhed",
    tagline: "Hele rejsen med os",
    fullPrice: "28.500 kr.",
    upfrontPrice: "14.250 kr.",
    badge: "Anbefalet",
    features: [
      "Visuel identitet & rådgivning",
      "CVR, bank & det praktiske",
      "Shop med betaling",
      "Launch & synlighed",
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
