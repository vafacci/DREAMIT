"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { HeroIntroContent } from "@/components/hero/HeroIntroContent";
import { bindScrollTriggerRefresh, loadGsapScroll } from "@/lib/gsapScroll";
import {
  getHeroScrollHeight,
  getHeroScrollScrub,
} from "@/lib/heroScrollConstants";
import { getHeroTimeline } from "@/lib/heroScrollMath";
import { isMobileDevice } from "@/lib/isMobileDevice";

function applyStageTransform(
  stage: HTMLElement,
  t: ReturnType<typeof getHeroTimeline>,
) {
  stage.style.transform = `translate3d(0, ${t.stageTranslateY}px, ${t.stageTranslateZ}px) rotateX(${t.stageRotateX}deg) rotateY(${t.stageRotateY}deg) scale(${t.stageScale})`;
}

export function HeroScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(() =>
    getHeroScrollHeight(false),
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const headline = headlineRef.current;
    const details = detailsRef.current;
    if (!section || !stage || !headline || !details) return;

    const mobile = isMobileDevice();
    const height = getHeroScrollHeight(mobile);
    setScrollHeight(height);
    section.style.height = height;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const end = getHeroTimeline(1, mobile);
      headline.style.opacity = String(end.logoSceneOpacity);
      details.style.opacity = String(end.introOpacity);
      details.style.transform = `translate3d(0, ${end.introY}px, 0)`;
      stage.style.opacity = String(end.stageOpacity);
      applyStageTransform(stage, end);
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let unbindRefresh: (() => void) | undefined;

    void loadGsapScroll().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      gsap.set(stage, {
        force3D: true,
        transformOrigin: "50% 100%",
        transformStyle: "preserve-3d",
      });

      if (wordmarkRef.current) {
        gsap.set(wordmarkRef.current, {
          force3D: true,
          transformOrigin: "50% 50%",
        });
      }

      gsap.set(details, { force3D: true });

      const setStageOpacity = gsap.quickSetter(stage, "opacity");
      const setHeadlineOpacity = gsap.quickSetter(headline, "opacity");
      const setDetailsOpacity = gsap.quickSetter(details, "opacity");
      const setDetailsY = gsap.quickSetter(details, "y", "px");
      const setHintOpacity = hintRef.current
        ? gsap.quickSetter(hintRef.current, "opacity")
        : null;
      const setLogoScale = wordmarkRef.current
        ? gsap.quickSetter(wordmarkRef.current, "scale")
        : null;

      let introInteractive = true;

      const update = (progress: number) => {
        const t = getHeroTimeline(progress, mobile);

        applyStageTransform(stage, t);
        setStageOpacity(t.stageOpacity);
        setHeadlineOpacity(t.logoSceneOpacity);
        setDetailsOpacity(t.introOpacity);
        setDetailsY(t.introY);
        if (setHintOpacity) setHintOpacity(t.scrollHintOpacity);
        if (setLogoScale) setLogoScale(t.logoScale);

        const interactive = t.introOpacity > 0.15 && t.exitProgress < 0.08;
        if (interactive !== introInteractive) {
          introInteractive = interactive;
          details.style.pointerEvents = interactive ? "auto" : "none";
        }
      };

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          id: "hero-scroll",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: getHeroScrollScrub(mobile),
          fastScrollEnd: mobile,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => update(self.progress),
        });
      }, section);

      update(0);

      const refresh = () => {
        ScrollTrigger.refresh();
        const trigger = ScrollTrigger.getById("hero-scroll");
        if (trigger) update(trigger.progress);
      };

      refresh();
      unbindRefresh = bindScrollTriggerRefresh(refresh, mobile);
    });

    return () => {
      cancelled = true;
      unbindRefresh?.();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative z-20 bg-dream-bg"
      style={{ height: scrollHeight }}
      aria-label="Intro"
    >
      <div
        className="hero-fold-sticky sticky top-0 overflow-hidden [perspective:1400px] [transform-style:preserve-3d]"
        style={{ perspectiveOrigin: "50% 100%" }}
      >
        <div
          ref={stageRef}
          className="relative h-full w-full bg-dream-bg [transform-style:preserve-3d] [transform-origin:50%_100%] [backface-visibility:hidden]"
        >
          <div className="absolute inset-0 z-10 flex items-start justify-center overflow-y-auto">
            <HeroIntroContent
              headlineRef={headlineRef}
              wordmarkRef={wordmarkRef}
              detailsRef={detailsRef}
            />
          </div>

          <div
            ref={hintRef}
            className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-dream-muted">
              Scroll
            </span>
            <span className="block h-6 w-px animate-pulse bg-dream-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
