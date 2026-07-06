import { withBasePath } from "./basePath";

export const PROBLEM_HEADER = {
  title: "Du kender det",
  intro: {
    before: "Du elsker det, du laver — men fire ting skal falde på plads:",
    after: "Det er dér mange går i stå.",
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
    subtitle: "Du ved ikke rigtig, hvem dit brand er endnu.",
    image: { src: withBasePath("/carousel/look/look.jpg"), alt: "Brandidentitet eksempel" },
  },
  {
    title: "Oprettelse",
    subtitle: "CVR, bank og papirarbejde føles som et bjerg.",
    image: { src: withBasePath("/carousel/navn/navn.jpg"), alt: "Oprettelse af firma" },
  },
  {
    title: "Shop",
    subtitle: "En webshop uden at drukne i teknik.",
    image: { src: withBasePath("/carousel/shop/shop.jpg"), alt: "Webshop eksempel" },
  },
  {
    title: "Salg",
    subtitle: "Du ved ikke, hvordan du får de første kunder.",
    image: { src: withBasePath("/carousel/salg/salg.jpg"), alt: "Marketing og salg eksempel" },
  },
];
