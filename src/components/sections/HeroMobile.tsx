"use client";

import { HeroIntroContent } from "@/components/hero/HeroIntroContent";

export function HeroMobile() {
  return (
    <section
      data-section="hero"
      className="hero-fold relative z-20 bg-dream-bg"
      aria-label="Intro"
    >
      <HeroIntroContent />
    </section>
  );
}
