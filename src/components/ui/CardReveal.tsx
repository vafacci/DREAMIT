"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type CardRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function CardReveal({
  children,
  className = "",
  delay = 0,
}: CardRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`card-reveal h-full ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--card-reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
