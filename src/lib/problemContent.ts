import { withBasePath } from "./basePath";

export const PROBLEM_HEADER = {
  title: "Du kender det",
  intro: {
    before: "Du elsker det, du laver — men fire ting skal falde på plads:",
    after: "Det er dér mange går i stå — og dér hjælper vi.",
    pillars: ["brand", "oprettelse", "shop", "salg"] as const,
  },
  image: {
    src: withBasePath("/carousel/problem-intro.jpg"),
    alt: "Person der læser magasin — overvældet af valg",
  },
};

export type ProblemStep = {
  title: string;
  pain: string;
  help: string;
  image: { src: string; alt: string };
};

export const PROBLEM_STEPS: ProblemStep[] = [
  {
    title: "Brand",
    pain: "Du ved ikke rigtig, hvem dit brand er endnu.",
    help: "Vi finder det sammen — og gør det visuelt.",
    image: { src: withBasePath("/carousel/look/look.jpg"), alt: "Brandidentitet eksempel" },
  },
  {
    title: "Oprettelse",
    pain: "CVR, bank og papirarbejde føles som et bjerg.",
    help: "Vi guider dig igennem det praktiske.",
    image: { src: withBasePath("/carousel/navn/navn.jpg"), alt: "Oprettelse af firma" },
  },
  {
    title: "Shop",
    pain: "Teknikken skal ikke være det, der stopper dig.",
    help: "Vi bygger webshoppen og sætter den op for dig.",
    image: { src: withBasePath("/carousel/shop/shop.jpg"), alt: "Webshop eksempel" },
  },
  {
    title: "Salg",
    pain: "De første kunder føles langt væk.",
    help: "Vi gør shoppen klar, så du kan begynde at sælge.",
    image: { src: withBasePath("/carousel/salg/salg.jpg"), alt: "Marketing og salg eksempel" },
  },
];
