import type { StaticImageData } from "next/image";

import dubbuHero from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.29.44.png";
import dubbuIngredients from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.29.15.png";
import dubbuProducts from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.29.57.png";
import dubbuParty from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.30.26.png";
import dubbuBundle from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.30.48.png";
import linneaHero from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.31.17.png";
import linneaMerch from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.31.25.png";
import linneaSunglasses from "@/assets/cases/Skærmbillede 2026-07-05 kl. 22.31.40.png";

export type CaseSlide = {
  id: string;
  project: string;
  category: string;
  caption: string;
  image: StaticImageData;
};

export const CASE_SLIDES: CaseSlide[] = [
  {
    id: "dubbu-hero",
    project: "dubbu",
    category: "Beauty e-commerce",
    caption: "Editorial hero med tydelig CTA fra første scroll.",
    image: dubbuHero,
  },
  {
    id: "dubbu-ingredients",
    project: "dubbu",
    category: "Beauty e-commerce",
    caption: "Shop by concern — storytelling gennem ingredienser.",
    image: dubbuIngredients,
  },
  {
    id: "dubbu-products",
    project: "dubbu",
    category: "Beauty e-commerce",
    caption: "Kurateret produktkarusel med tabs og shop-now.",
    image: dubbuProducts,
  },
  {
    id: "dubbu-party",
    project: "dubbu",
    category: "Beauty e-commerce",
    caption: "Kampagne-grid med badges og hurtig add-to-cart.",
    image: dubbuParty,
  },
  {
    id: "dubbu-bundle",
    project: "dubbu",
    category: "Beauty e-commerce",
    caption: "Bundle-flow der øger kurv-værdi på mobil.",
    image: dubbuBundle,
  },
  {
    id: "linnea-hero",
    project: "Linnea Vale",
    category: "Creator merch",
    caption: "Personligt brand med varm, redaktionel forside.",
    image: linneaHero,
  },
  {
    id: "linnea-merch",
    project: "Linnea Vale",
    category: "Creator merch",
    caption: "Merch-grid med produktkarusel og farvevalg.",
    image: linneaMerch,
  },
  {
    id: "linnea-sunglasses",
    project: "Linnea Vale",
    category: "Creator merch",
    caption: "Editorial produktsektion med SoMe-energi.",
    image: linneaSunglasses,
  },
];
