"use client";

import { Button } from "@/components/ui/Button";
import { HeroBrandHeadline } from "@/components/hero/HeroBrandHeadline";
import { PrimaryBannerButton } from "@/components/ui/PrimaryBannerButton";
import { CTA_SECONDARY, CTA_SECONDARY_HREF } from "@/lib/constants";

type HeroIntroContentProps = {
  wordmarkRef?: React.Ref<HTMLSpanElement>;
  detailsRef?: React.Ref<HTMLDivElement>;
  headlineRef?: React.Ref<HTMLDivElement>;
};

export function HeroIntroContent({
  wordmarkRef,
  detailsRef,
  headlineRef,
}: HeroIntroContentProps) {
  return (
    <div className="hero-intro">
      <div ref={headlineRef} className="hero-intro__logo-wrap">
        <HeroBrandHeadline wordmarkRef={wordmarkRef} />
      </div>

      <div ref={detailsRef} className="hero-intro__details">
        <p className="hero-intro__eyebrow">fra hobby til webshop</p>

        <p className="hero-intro__body">
          Vi hjælper dig fra idé og drøm til en professionel webshop — uden at
          det bliver uoverskueligt.
        </p>

        <div className="hero-intro__actions">
          <PrimaryBannerButton className="hero-intro__btn" />
          <Button
            href={CTA_SECONDARY_HREF}
            variant="secondary-inverted"
            className="hero-intro__btn"
          >
            {CTA_SECONDARY}
          </Button>
        </div>
      </div>
    </div>
  );
}
