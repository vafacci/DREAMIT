"use client";

import { useRef } from "react";
import { HeroLogoScroll } from "@/components/hero/HeroLogoScroll";
import { Button } from "@/components/ui/Button";
import {
  CTA_PRIMARY,
  CTA_PRIMARY_HREF,
  CTA_SECONDARY,
  CTA_SECONDARY_HREF,
} from "@/lib/constants";
import {
  HERO_SCROLL_HEIGHT,
  useHeroScrollProgress,
} from "@/hooks/useHeroScrollProgress";

export function HeroScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useHeroScrollProgress(sectionRef);

  const introInteractive = t.introOpacity > 0.15;

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative bg-black"
      style={{ height: HERO_SCROLL_HEIGHT }}
      aria-label="Intro"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black">
        <div
          className="absolute inset-0 z-10"
          style={{ opacity: t.logoSceneOpacity }}
        >
          <HeroLogoScroll progress={t.cameraProgress} />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-br from-accent/10 via-transparent to-transparent"
          style={{ opacity: t.accentGlowOpacity }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-5"
          style={{
            opacity: t.introOpacity,
            transform: `translateY(${t.introY}px)`,
            pointerEvents: introInteractive ? "auto" : "none",
          }}
        >
          <div className="container-site flex max-w-lg flex-col items-center text-center">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              Launch studio
            </p>

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
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: t.scrollHintOpacity }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
            Scroll
          </span>
          <span className="block h-8 w-px animate-pulse bg-accent" />
        </div>
      </div>
    </section>
  );
}
