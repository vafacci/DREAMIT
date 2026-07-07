"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CTA_PRIMARY, CTA_PRIMARY_HREF } from "@/lib/constants";

const HIDE_SELECTOR = "[data-hide-sticky-cta], [data-primary-cta]";
const SYNC_EVENT = "dream:sticky-cta-sync";

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      const shouldHide = Array.from(document.querySelectorAll(HIDE_SELECTOR)).some(isInViewport);
      setVisible(!shouldHide);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener(SYNC_EVENT, sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener(SYNC_EVENT, sync);
    };
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
