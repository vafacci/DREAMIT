"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/ui/LogoMark";

type Keyframe = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
};

const KEYFRAMES: Record<string, Keyframe> = {
  hero: { x: 82, y: 18, scale: 1.35, rotate: -28, opacity: 0.14 },
  problem: { x: 8, y: 48, scale: 1.75, rotate: 12, opacity: 0.2 },
  solution: { x: 88, y: 72, scale: 1.15, rotate: -8, opacity: 0.11 },
};

const SECTION_ORDER = ["hero", "problem", "solution"] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function interpolateKeyframe(from: Keyframe, to: Keyframe, t: number): Keyframe {
  const eased = easeInOut(t);
  return {
    x: lerp(from.x, to.x, eased),
    y: lerp(from.y, to.y, eased),
    scale: lerp(from.scale, to.scale, eased),
    rotate: lerp(from.rotate, to.rotate, eased),
    opacity: lerp(from.opacity, to.opacity, eased),
  };
}

function getScrollKeyframe(): Keyframe {
  if (typeof window === "undefined") return KEYFRAMES.hero;

  const trigger = window.innerHeight * 0.55;

  for (let i = 0; i < SECTION_ORDER.length - 1; i++) {
    const currentId = SECTION_ORDER[i];
    const nextId = SECTION_ORDER[i + 1];
    const nextEl = document.querySelector(`[data-section="${nextId}"]`);

    if (!nextEl) continue;

    const nextTop = nextEl.getBoundingClientRect().top;

    if (nextTop < trigger && nextTop > -window.innerHeight) {
      const t = 1 - Math.max(0, Math.min(1, nextTop / trigger));
      return interpolateKeyframe(KEYFRAMES[currentId], KEYFRAMES[nextId], t);
    }
  }

  const lastId = SECTION_ORDER[SECTION_ORDER.length - 1];
  const lastEl = document.querySelector(`[data-section="${lastId}"]`);

  if (lastEl && lastEl.getBoundingClientRect().top < trigger) {
    return KEYFRAMES[lastId];
  }

  return KEYFRAMES.hero;
}

export function ScrollBrandMark() {
  const markRef = useRef<HTMLDivElement>(null);
  const gradientARef = useRef<HTMLDivElement>(null);
  const gradientBRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const keyframe = getScrollKeyframe();

      if (markRef.current) {
        markRef.current.style.left = `${keyframe.x}%`;
        markRef.current.style.top = `${keyframe.y}%`;
        markRef.current.style.opacity = `${keyframe.opacity}`;
        markRef.current.style.transform = `translate(-50%, -50%) scale(${keyframe.scale}) rotate(${keyframe.rotate}deg)`;
      }

      const problemEl = document.querySelector('[data-section="problem"]');
      const problemTop = problemEl?.getBoundingClientRect().top ?? Infinity;
      const blend = 1 - Math.max(0, Math.min(1, problemTop / window.innerHeight));

      if (gradientARef.current) {
        gradientARef.current.style.opacity = `${lerp(0.35, 0, blend)}`;
      }
      if (gradientBRef.current) {
        gradientBRef.current.style.opacity = `${lerp(0, 0.45, blend)}`;
      }
    };

    const onScroll = () => {
      if (reducedMotion) {
        update();
        return;
      }
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
      <div
        ref={gradientARef}
        className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent"
        style={{ opacity: 0.35 }}
      />
      <div
        ref={gradientBRef}
        className="absolute inset-0 bg-gradient-to-tl from-brand/25 via-transparent to-transparent"
        style={{ opacity: 0 }}
      />

      <div ref={markRef} className="absolute will-change-[transform,opacity]">
        <LogoMark className="h-[min(88vw,520px)] w-[min(88vw,520px)]" />
      </div>
    </div>
  );
}
