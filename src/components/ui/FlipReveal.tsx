"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type FlipRevealProps = {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  delay?: number;
};

export function FlipReveal({
  front,
  back,
  className = "",
  delay = 0,
}: FlipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startScrollY = useRef(0);
  /** true = forside (billede + tekst) synlig */
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    startScrollY.current = window.scrollY;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
    };

    const shouldReveal = () => {
      const rect = el.getBoundingClientRect();
      const visiblePx =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const ratio = visiblePx / rect.height;
      const scrolled = window.scrollY > startScrollY.current + 12;

      return ratio >= 0.18 && rect.top < window.innerHeight * 0.88 && scrolled;
    };

    const onScroll = () => {
      if (shouldReveal()) reveal();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && shouldReveal()) {
            reveal();
          }
        }
      },
      { threshold: [0, 0.18, 0.35, 0.55] },
    );

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`flip-scene h-full ${className}`}>
      <div
        className={`flip-card h-full ${revealed ? "is-revealed" : ""}`}
        style={{ transitionDelay: revealed ? `${delay}ms` : "0ms" }}
      >
        <div className="flip-card__face flip-card__front">{front}</div>
        <div className="flip-card__face flip-card__back">{back}</div>
      </div>
    </div>
  );
}
