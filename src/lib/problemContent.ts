export const PROBLEM_HEADER = {
  label: "Problemet",
  title: "Du kender det",
  subtitle:
    "Du elsker det, du laver. Men vejen fra hobby til rigtig forretning kan føles som en jungle — navn, logo, shop og salg på én gang.",
  image: {
    src: "/carousel/problem-intro.jpg",
    alt: "Person der læser magasin — overvældet af valg",
  },
} as const;

export type ProblemStep = {
  number: string;
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
};

export const PROBLEM_STEPS: ProblemStep[] = [
  {
    number: "01",
    title: "Navn",
    subtitle:
      "Du ved ikke, hvad dit brand skal hedde — eller om det overhovedet lyder rigtigt.",
    image: { src: "/carousel/navn/navn.jpg", alt: "Brandnavn eksempel" },
  },
  {
    number: "02",
    title: "Look",
    subtitle: "Ingen logo, ingen farver, ingen stil der føles som dig.",
    image: { src: "/carousel/look/look.jpg", alt: "Visuel identitet eksempel" },
  },
  {
    number: "03",
    title: "Shop",
    subtitle:
      "Du ved ikke, hvordan du får en webshop op — uden at det bliver overvældende.",
    image: { src: "/carousel/shop/shop.jpg", alt: "Webshop eksempel" },
  },
  {
    number: "04",
    title: "Salg",
    subtitle: "Du ved ikke, hvordan du når ud og får dine første kunder.",
    image: { src: "/carousel/salg/salg.jpg", alt: "Marketing og salg eksempel" },
  },
];
