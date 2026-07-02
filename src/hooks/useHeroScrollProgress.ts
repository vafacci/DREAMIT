"use client";

import { useEffect, useState } from "react";
import { getHeroScrollScrub } from "@/lib/heroScrollConstants";
import {
  getHeroTimeline,
  type HeroTimeline,
} from "@/lib/heroScrollMath";
import { bindScrollTriggerRefresh, loadGsapScroll } from "@/lib/gsapScroll";
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

    let cancelled = false;
    let unbindRefresh: (() => void) | undefined;
    let trigger: { kill: () => void } | undefined;

    void loadGsapScroll().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        setTimeline(getHeroTimeline(1));
        return;
      }

      const mobile = isMobileDevice();

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: getHeroScrollScrub(mobile),
        onUpdate: (self) => setTimeline(getHeroTimeline(self.progress)),
      });

      const refresh = () => ScrollTrigger.refresh();
      unbindRefresh = bindScrollTriggerRefresh(refresh, mobile);
    });

    return () => {
      cancelled = true;
      trigger?.kill();
      unbindRefresh?.();
    };
  }, [sectionRef]);

  return timeline;
}
