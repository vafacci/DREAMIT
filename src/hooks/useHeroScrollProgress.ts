"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getHeroScrollScrub } from "@/lib/heroScrollConstants";
import {
  getHeroTimeline,
  type HeroTimeline,
} from "@/lib/heroScrollMath";
import { ensureGsapScroll } from "@/lib/gsapScroll";
import { isMobileDevice } from "@/lib/isMobileDevice";

export {
  HERO_SCROLL_HEIGHT,
  HERO_SCROLL_HEIGHT_VH,
  HERO_SCROLL_SCRUB,
} from "@/lib/heroScrollConstants";

export type { HeroTimeline };

export { getHeroTimeline };

/** @deprecated Brug direkte DOM/GSAP i HeroScrollExperience */
export function useHeroScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [timeline, setTimeline] = useState<HeroTimeline>(() => getHeroTimeline(0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapScroll();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setTimeline(getHeroTimeline(1));
      return;
    }

    const mobile = isMobileDevice();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: getHeroScrollScrub(mobile),
      onUpdate: (self) => setTimeline(getHeroTimeline(self.progress)),
    });

    const onResize = () => ScrollTrigger.refresh();

    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [sectionRef]);

  return timeline;
}
