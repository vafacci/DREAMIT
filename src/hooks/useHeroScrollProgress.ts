"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getHeroScrollScrub } from "@/lib/heroScrollConstants";
import { isMobileDevice } from "@/lib/isMobileDevice";

gsap.registerPlugin(ScrollTrigger);

export {
  HERO_SCROLL_HEIGHT,
  HERO_SCROLL_HEIGHT_VH,
  HERO_SCROLL_SCRUB,
} from "@/lib/heroScrollConstants";

export type HeroTimeline = {
  raw: number;
  introOpacity: number;
  introY: number;
  accentGlowOpacity: number;
  logoSceneOpacity: number;
  cameraProgress: number;
  scrollHintOpacity: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function mapRange(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

export function getHeroTimeline(progress: number): HeroTimeline {
  const raw = clamp01(progress);

  const introFade = mapRange(raw, 0.16, 0.42);
  const introOpacity = clamp01(1 - easeInOutCubic(introFade));
  const introY = easeInOutCubic(introFade) * -28;

  const cameraProgress = easeInOutCubic(mapRange(raw, 0.12, 0.9));

  const accentGlowOpacity = clamp01(
    1 - easeInOutCubic(mapRange(raw, 0.5, 0.88)) * 0.4,
  );

  const logoSceneOpacity = clamp01(1 - easeInOutCubic(mapRange(raw, 0.88, 1)));

  const scrollHintOpacity = clamp01(1 - raw / 0.16);

  return {
    raw,
    introOpacity,
    introY,
    accentGlowOpacity,
    logoSceneOpacity,
    cameraProgress,
    scrollHintOpacity,
  };
}

export function useHeroScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [timeline, setTimeline] = useState<HeroTimeline>(() => getHeroTimeline(0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
      fastScrollEnd: mobile,
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
