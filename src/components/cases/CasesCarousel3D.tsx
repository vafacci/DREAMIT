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
  active,
  eager,
}: {
  alt: string;
  image: StaticImageData;
  active?: boolean;
  eager?: boolean;
}) {
  return (
    <div
      className={`cases-panel__frame ${active ? "cases-panel__frame--active" : ""}`}
    >
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
  const faceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollHeight, setScrollHeight] = useState(() =>
    getCasesScrollHeight(CASE_SLIDES.length, false),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const applyRing = useCallback((progress: number) => {
    const ring = ringRef.current;
    if (!ring) return;

    const slideCount = CASE_SLIDES.length;
    const rotation = getCasesRingRotation(progress, slideCount);
    ring.style.transform = `rotateX(8deg) rotateY(${rotation}deg)`;

    const step = 360 / slideCount;

    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;

      const face = faceRefs.current[index];
      const visual = getCasePanelVisual(index, rotation, slideCount);
      const worldAngle = (((index * step + rotation) % 360) + 360) % 360;
      const distance = Math.min(worldAngle, 360 - worldAngle);
      const isFront = distance < step * 0.42;

      panel.style.opacity = String(visual.opacity);
      panel.style.zIndex = String(visual.zIndex);
      panel.style.transform = `rotateY(${step * index}deg) translateZ(var(--cases-carousel-radius)) scale(${visual.scale})`;

      if (face) {
        face.style.transform = "translateZ(0.1px)";
        face.style.filter = isFront
          ? "none"
          : `blur(${visual.blur}px) brightness(${visual.brightness})`;
      }
    });

    const nextIndex = getActiveSlideIndex(progress, slideCount);
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  }, []);

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
          scrub: mobile ? 0.65 : 0.9,
          pin: ".cases-carousel__pin",
          anticipatePin: 1,
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
  }, [applyRing]);

  const activeSlide = CASE_SLIDES[activeIndex];

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
            <p className="cases-carousel__project">{activeSlide.project}</p>
            <p className="cases-carousel__category">{activeSlide.category}</p>
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
                    aria-hidden={index !== activeIndex}
                  >
                    <div
                      ref={(node) => {
                        faceRefs.current[index] = node;
                      }}
                      className="cases-panel__face"
                    >
                      <CasePhoneFrame
                        alt={`${slide.project} — ${slide.caption}`}
                        image={slide.image}
                        active={index === activeIndex}
                        eager={index < 3}
                      />
                    </div>
                  </div>
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

        <div className="cases-carousel__footer">
          <p className="cases-carousel__caption" aria-live="polite">
            {activeSlide.caption}
          </p>
          <div className="cases-carousel__controls">
            <div className="cases-carousel__dots" role="tablist" aria-label="Eksempler">
              {CASE_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`${slide.project}, slide ${index + 1}`}
                  className={`cases-carousel__dot-btn ${
                    index === activeIndex ? "cases-carousel__dot-btn--active" : ""
                  }`}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
