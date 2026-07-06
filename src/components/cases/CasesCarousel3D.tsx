"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { CASE_SLIDES } from "@/lib/casesContent";
import {
  getActiveSlideIndex,
  getCasePanelVisual,
  getCasesRingRotation,
  getCasesScrollHeight,
} from "@/lib/casesCarouselMath";
import { bindScrollTriggerRefresh, loadGsapScroll } from "@/lib/gsapScroll";
import { isMobileDevice } from "@/lib/isMobileDevice";

function syncStickyCta() {
  window.dispatchEvent(new CustomEvent("dream:sticky-cta-sync"));
}

function setCasesActive(active: boolean) {
  if (active) {
    document.body.setAttribute("data-cases-active", "");
  } else {
    document.body.removeAttribute("data-cases-active");
  }
  syncStickyCta();
}

function CasePhoneFrame({
  alt,
  image,
  frameRef,
  eager,
}: {
  alt: string;
  image: StaticImageData;
  frameRef?: (node: HTMLDivElement | null) => void;
  eager?: boolean;
}) {
  return (
    <div ref={frameRef} className="cases-panel__frame">
      <div className="cases-panel__screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          className="cases-panel__image"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}

export function CasesCarousel3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRef = useRef<HTMLParagraphElement>(null);
  const categoryRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [scrollHeight, setScrollHeight] = useState(() =>
    getCasesScrollHeight(CASE_SLIDES.length, false),
  );

  const updateActiveUi = useCallback((index: number) => {
    if (index === activeIndexRef.current) return;

    activeIndexRef.current = index;
    const slide = CASE_SLIDES[index];

    if (projectRef.current) projectRef.current.textContent = slide.project;
    if (categoryRef.current) categoryRef.current.textContent = slide.category;
    if (captionRef.current) captionRef.current.textContent = slide.caption;

    dotRefs.current.forEach((dot, dotIndex) => {
      if (!dot) return;
      const active = dotIndex === index;
      dot.classList.toggle("cases-carousel__dot-btn--active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });

    frameRefs.current.forEach((frame, frameIndex) => {
      frame?.classList.toggle("cases-panel__frame--active", frameIndex === index);
    });

    panelRefs.current.forEach((panel, panelIndex) => {
      panel?.setAttribute("aria-hidden", panelIndex !== index ? "true" : "false");
    });
  }, []);

  const applyRing = useCallback(
    (progress: number) => {
      const ring = ringRef.current;
      if (!ring) return;

      const slideCount = CASE_SLIDES.length;
      const rotation = getCasesRingRotation(progress, slideCount);
      ring.style.transform = `rotateX(3deg) rotateY(${rotation}deg)`;

      const step = 360 / slideCount;

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        const visual = getCasePanelVisual(index, rotation, slideCount);
        panel.style.opacity = String(visual.opacity);
        panel.style.zIndex = String(visual.zIndex);
        panel.style.transform = `rotateY(${step * index}deg) translateZ(var(--cases-carousel-radius)) scale(${visual.scale})`;
      });

      updateActiveUi(getActiveSlideIndex(progress, slideCount));
    },
    [updateActiveUi],
  );

  const scrollToIndex = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const maxIndex = Math.max(0, CASE_SLIDES.length - 1);
    const target = Math.max(0, Math.min(index, maxIndex));
    const progress = maxIndex === 0 ? 0 : target / maxIndex;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = section.offsetHeight - window.innerHeight;
    const targetY = sectionTop + progress * scrollable;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  useLayoutEffect(() => {
    CASE_SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image.src;
    });
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const ring = ringRef.current;
    if (!section || !ring) return;

    const mobile = isMobileDevice();
    const height = getCasesScrollHeight(CASE_SLIDES.length, mobile);
    setScrollHeight(height);
    section.style.height = height;
    updateActiveUi(0);
    applyRing(0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCasesActive(true);
      return () => setCasesActive(false);
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let unbindRefresh: (() => void) | undefined;

    void loadGsapScroll().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      gsap.set(ring, {
        force3D: true,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
      });

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        gsap.set(panel, {
          force3D: true,
          transformStyle: "preserve-3d",
        });
      });

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          id: "cases-carousel",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: mobile ? true : 0.75,
          pin: ".cases-carousel__pin",
          anticipatePin: 1,
          fastScrollEnd: mobile,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyRing(self.progress),
          onEnter: () => setCasesActive(true),
          onEnterBack: () => setCasesActive(true),
          onLeave: () => setCasesActive(false),
          onLeaveBack: () => setCasesActive(false),
        });
      }, section);

      applyRing(0);

      const refresh = () => {
        ScrollTrigger.refresh();
        const trigger = ScrollTrigger.getById("cases-carousel");
        if (trigger) applyRing(trigger.progress);
      };

      refresh();
      unbindRefresh = bindScrollTriggerRefresh(refresh, mobile);
    });

    return () => {
      cancelled = true;
      setCasesActive(false);
      unbindRefresh?.();
      ctx?.revert();
    };
  }, [applyRing, updateActiveUi]);

  const initialSlide = CASE_SLIDES[0];

  return (
    <section
      ref={sectionRef}
      className="cases-carousel"
      style={{ height: scrollHeight }}
      data-hide-sticky-cta
      aria-label="Eksempler"
    >
      <div className="cases-carousel__pin">
        <div className="cases-carousel__glow" aria-hidden />

        <div className="cases-carousel__layout">
          <div className="cases-carousel__meta" aria-live="polite">
            <p ref={projectRef} className="cases-carousel__project">
              {initialSlide.project}
            </p>
            <p ref={categoryRef} className="cases-carousel__category">
              {initialSlide.category}
            </p>
          </div>

          <div className="cases-carousel__stage">
            <div className="cases-carousel__viewport">
              <div className="cases-carousel__floor" aria-hidden />
              <div ref={ringRef} className="cases-carousel__ring">
                {CASE_SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    ref={(node) => {
                      panelRefs.current[index] = node;
                    }}
                    className="cases-carousel__panel"
                    aria-hidden={index !== 0}
                  >
                    <div className="cases-panel__face">
                      <CasePhoneFrame
                        alt={`${slide.project} — ${slide.caption}`}
                        image={slide.image}
                        eager={index < 4}
                        frameRef={(node) => {
                          frameRefs.current[index] = node;
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cases-carousel__footer">
            <p ref={captionRef} className="cases-carousel__caption" aria-live="polite">
              {initialSlide.caption}
            </p>
            <div className="cases-carousel__controls">
              <div className="cases-carousel__dots" role="tablist" aria-label="Eksempler">
                {CASE_SLIDES.map((slide, index) => (
                  <button
                    key={slide.id}
                    ref={(node) => {
                      dotRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={index === 0}
                    aria-label={`${slide.project}, slide ${index + 1}`}
                    className={`cases-carousel__dot-btn ${
                      index === 0 ? "cases-carousel__dot-btn--active" : ""
                    }`}
                    onClick={() => scrollToIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="cases-carousel__hint">
            <span className="cases-carousel__hint-label">Scroll</span>
            <span className="cases-carousel__hint-line" aria-hidden />
          </p>

          <div className="cases-carousel__static-fallback">
            {CASE_SLIDES.map((slide) => (
              <CasePhoneFrame
                key={slide.id}
                alt={`${slide.project} — ${slide.caption}`}
                image={slide.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
