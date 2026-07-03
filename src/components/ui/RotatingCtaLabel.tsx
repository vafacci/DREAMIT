"use client";

import { useEffect, useState } from "react";
import {
  CTA_BANNER_INTERVAL_MS,
  CTA_BANNER_LABELS,
  CTA_PRIMARY,
} from "@/lib/constants";

export function RotatingCtaLabel() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();

    if (mq.matches) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % CTA_BANNER_LABELS.length);
    }, CTA_BANNER_INTERVAL_MS);

    mq.addEventListener("change", update);
    return () => {
      window.clearInterval(interval);
      mq.removeEventListener("change", update);
    };
  }, []);

  const label = reducedMotion ? CTA_PRIMARY : CTA_BANNER_LABELS[index];

  return (
    <span
      className="relative inline-flex min-w-[9.5rem] items-center justify-center overflow-hidden"
      aria-live="polite"
    >
      <span
        key={label}
        className="inline-block motion-reduce:animate-none motion-safe:animate-[cta-banner-in_450ms_ease-out]"
      >
        {label}
      </span>
    </span>
  );
}
