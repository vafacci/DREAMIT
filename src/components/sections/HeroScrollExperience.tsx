"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import logoSymbol from "@/assets/logo-symbol.webp";
import { Button } from "@/components/ui/Button";
import {
  CTA_PRIMARY,
  CTA_PRIMARY_HREF,
  CTA_SECONDARY,
  CTA_SECONDARY_HREF,
} from "@/lib/constants";
import { bindScrollTriggerRefresh, loadGsapScroll } from "@/lib/gsapScroll";
import {
  getHeroScrollHeight,
  getHeroScrollScrub,
} from "@/lib/heroScrollConstants";
import { getHeroTimeline } from "@/lib/heroScrollMath";
import { isMobileDevice } from "@/lib/isMobileDevice";

export function HeroScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoSceneRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(() =>
    getHeroScrollHeight(false),
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const logoScene = logoSceneRef.current;
    const intro = introRef.current;
    if (!section || !logoScene || !intro) return;

    const mobile = isMobileDevice();
    const height = getHeroScrollHeight(mobile);
    setScrollHeight(height);
    section.style.height = height;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const end = getHeroTimeline(1);
      logoScene.style.opacity = String(end.logoSceneOpacity);
      intro.style.opacity = String(end.introOpacity);
      intro.style.transform = `translate3d(0, ${end.introY}px, 0)`;
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let unbindRefresh: (() => void) | undefined;

    void loadGsapScroll().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const setLogoSceneOpacity = gsap.quickSetter(logoScene, "opacity");
      const setIntroOpacity = gsap.quickSetter(intro, "opacity");
      const setIntroY = gsap.quickSetter(intro, "y", "px");
      const setGlowOpacity = glowRef.current
        ? gsap.quickSetter(glowRef.current, "opacity")
        : null;
      const setHintOpacity = hintRef.current
        ? gsap.quickSetter(hintRef.current, "opacity")
        : null;
      const setLogoScale =
        !mobile && logoImgRef.current
          ? gsap.quickSetter(logoImgRef.current, "scale")
          : null;
      const setLogoOpacity = logoImgRef.current
        ? gsap.quickSetter(logoImgRef.current, "opacity")
        : null;

      if (logoImgRef.current && !mobile) {
        gsap.set(logoImgRef.current, {
          force3D: true,
          transformOrigin: "50% 50%",
        });
      }

      gsap.set(intro, { force3D: !mobile });

      let introInteractive = true;

      const update = (progress: number) => {
        const t = getHeroTimeline(progress);
        setLogoSceneOpacity(t.logoSceneOpacity);
        setIntroOpacity(t.introOpacity);
        setIntroY(t.introY);
        if (setGlowOpacity) setGlowOpacity(t.accentGlowOpacity);
        if (setHintOpacity) setHintOpacity(t.scrollHintOpacity);
        if (setLogoScale) setLogoScale(0.7 + t.cameraProgress * 0.95);
        if (setLogoOpacity) setLogoOpacity(0.5 + t.cameraProgress * 0.5);

        const interactive = t.introOpacity > 0.15;
        if (interactive !== introInteractive) {
          introInteractive = interactive;
          intro.style.pointerEvents = interactive ? "auto" : "none";
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
      className="relative bg-black"
      style={{ height: scrollHeight }}
      aria-label="Intro"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black [contain:layout_paint] [transform:translateZ(0)]">
        <div ref={logoSceneRef} className="absolute inset-0 z-10">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black">
            <Image
              ref={logoImgRef}
              src={logoSymbol}
              alt=""
              priority
              sizes="(max-width: 768px) 70vw, 480px"
              className="h-auto w-[min(70vw,480px)] max-w-none select-none"
            />
          </div>
        </div>

        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-br from-brand/10 via-transparent to-transparent"
          aria-hidden="true"
        />

        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-5"
        >
          <div className="container-site flex max-w-lg flex-col items-center text-center">
            <h1 className="text-h1-mobile lg:text-h1-desktop mb-6 tracking-[0.02em] text-white">
              fra <span className="uppercase">hobby</span>
              <br />
              til <span className="uppercase">webshop</span>
            </h1>

            <p className="text-body mb-10 max-w-sm text-white/70">
              For brands der vil online — lige så professionelt som det, de
              laver.
            </p>

            <div className="flex w-full max-w-xs flex-col gap-3">
              <Button href={CTA_PRIMARY_HREF} className="w-full">
                {CTA_PRIMARY}
              </Button>
              <Button
                href={CTA_SECONDARY_HREF}
                variant="secondary-inverted"
                className="w-full"
              >
                {CTA_SECONDARY}
              </Button>
            </div>
          </div>
        </div>

        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
            Scroll
          </span>
          <span className="block h-8 w-px animate-pulse bg-brand" />
        </div>
      </div>
    </section>
  );
}
