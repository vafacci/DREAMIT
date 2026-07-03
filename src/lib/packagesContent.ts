export const PACKAGES_HEADER = {
  title: "Vælg din pakke",
  subtitle:
    "Vi tager først din anden halvdel, når du har fået succes med din webshop — fordi vi vil dig det bedste.",
};

export const PACKAGES = [
  {
    name: "Helhed",
    tagline: "Til dig der vil have det hele — fra idé til salg",
    fullPrice: "28.500 kr.",
    upfrontPrice: "14.250 kr.",
    badge: "Anbefalet",
    features: [
      "Brandidentitet og rådgivning",
      "Oprettelse af firma og bankkonto",
      "Webshop med betaling",
      "Marketing og launch — punkt til prikke",
    ],
    highlighted: true,
  },
  {
    name: "Webshop",
    tagline: "Til dig der allerede har brand — og bare skal have shoppen",
    fullPrice: "12.500 kr.",
    upfrontPrice: "6.250 kr.",
    badge: "Standard",
    features: [
      "Webshop med produkter og betaling",
      "Klar struktur — nem at bruge",
      "Mobilvenlig og klar til brug",
    ],
    highlighted: false,
  },
] as const;
