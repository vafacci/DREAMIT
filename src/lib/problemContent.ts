import { withBasePath } from "./basePath";

export const PROBLEM_HEADER = {
  title: "Du kender det",
  intro: {
    before: "Du elsker det, du laver. Men fire ting skal falde på plads på én gang:",
    after: "Det er dér mange går i stå — uden at det behøver at føles uoverskueligt.",
    pillars: ["brand", "oprettelse", "shop", "salg"] as const,
  },
  image: {
    src: withBasePath("/carousel/problem-intro.jpg"),
    alt: "Person der læser magasin — overvældet af valg",
  },
};

export type ProblemStep = {
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
};

export const PROBLEM_STEPS: ProblemStep[] = [
  {
    title: "Brand",
    subtitle:
      "Ingen navn, ingen logo, ingen stil — du ved ikke rigtig, hvem dit brand er endnu.",
    image: { src: withBasePath("/carousel/look/look.jpg"), alt: "Brandidentitet eksempel" },
  },
  {
    title: "Oprettelse",
    subtitle:
      "Firma, bankkonto, CVR — det praktiske føles uoverskueligt, før du overhovedet kommer i gang.",
    image: { src: withBasePath("/carousel/oprettelse/oprettelse.jpg"), alt: "Oprettelse af firma" },
  },
  {
    title: "Shop",
    subtitle:
      "Du ved ikke, hvordan du får en webshop op — uden at det bliver overvældende.",
    image: { src: withBasePath("/carousel/shop/shop.jpg"), alt: "Webshop eksempel" },
  },
  {
    title: "Salg",
    subtitle: "Du ved ikke, hvordan du når ud og får dine første kunder.",
    image: { src: withBasePath("/carousel/salg/salg.jpg"), alt: "Marketing og salg eksempel" },
  },
];
