"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CTA_PRIMARY, CTA_PRIMARY_HREF } from "@/lib/constants";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visibleMap = new Map<Element, boolean>();

    const sync = () => {
      const anyPrimaryVisible = [...visibleMap.values()].some(Boolean);
      setVisible(!anyPrimaryVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target, entry.isIntersecting);
        });
        sync();
      },
      { threshold: 0 },
    );

    document.querySelectorAll("[data-primary-cta]").forEach((el) => {
      visibleMap.set(el, false);
      observer.observe(el);
    });

    sync();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <Button
        href={CTA_PRIMARY_HREF}
        className={visible ? "pointer-events-auto" : "pointer-events-none"}
      >
        {CTA_PRIMARY}
      </Button>
    </div>
  );
}
