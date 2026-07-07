"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type { StaticImageData } from "next/image";
import { CASE_SLIDES } from "@/lib/casesContent";
import {
  getActiveSlideIndex,
  getCasePanelVisual,
  getCasesProgressForIndex,
  getCasesRingRotation,
} from "@/lib/casesCarouselMath";
import { loadGsapScroll } from "@/lib/gsapScroll";

const SWIPE_PIXELS_PER_SLIDE = 72;
const NAV_DURATION = 0.55;
const DRAG_THRESHOLD = 8;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRef = useRef<HTMLParagraphElement>(null);
  const categoryRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const progressRef = useRef(0);
  const navTweenRef = useRef<{ kill: () => void } | null>(null);
  const reducedMotionRef = useRef(false);
  const goToIndexRef = useRef<(index: number, animate?: boolean) => void>(() => {});

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

  const goToProgress = useCallback(
    (target: number, animate = true) => {
      const clamped = clamp01(target);

      if (!animate || reducedMotionRef.current) {
        navTweenRef.current?.kill();
        navTweenRef.current = null;
        progressRef.current = clamped;
        applyRing(clamped);
        return;
      }

      navTweenRef.current?.kill();

      const proxy = { p: progressRef.current };
      void loadGsapScroll().then(({ gsap }) => {
        navTweenRef.current = gsap.to(proxy, {
          p: clamped,
          duration: NAV_DURATION,
          ease: "power2.out",
          onUpdate: () => {
            progressRef.current = proxy.p;
            applyRing(proxy.p);
          },
          onComplete: () => {
            navTweenRef.current = null;
          },
        });
      });
    },
    [applyRing],
  );

  const goToIndex = useCallback(
    (index: number, animate = true) => {
      const maxIndex = Math.max(0, CASE_SLIDES.length - 1);
      const target = Math.max(0, Math.min(index, maxIndex));
      goToProgress(getCasesProgressForIndex(target, CASE_SLIDES.length), animate);
    },
    [goToProgress],
  );

  goToIndexRef.current = goToIndex;

  useLayoutEffect(() => {
    CASE_SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image.src;
    });
  }, []);

  useLayoutEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = reduced;

    progressRef.current = 0;
    applyRing(0);

    if (reduced) return;

    let cancelled = false;

    void loadGsapScroll().then(({ gsap }) => {
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
    });

    return () => {
      cancelled = true;
      navTweenRef.current?.kill();
      navTweenRef.current = null;
    };
  }, [applyRing]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reducedMotionRef.current) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let startProgress = 0;
    let lockAxis: "x" | "y" | null = null;

    const endDrag = (pointerId: number) => {
      if (!dragging) return;

      dragging = false;
      lockAxis = null;
      viewport.removeAttribute("data-dragging");

      try {
        viewport.releasePointerCapture(pointerId);
      } catch {
        // Pointer may already be released.
      }

      if (moved) {
        const index = getActiveSlideIndex(progressRef.current, CASE_SLIDES.length);
        goToIndexRef.current(index, true);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      navTweenRef.current?.kill();
      navTweenRef.current = null;

      dragging = true;
      moved = false;
      lockAxis = null;
      startX = event.clientX;
      startY = event.clientY;
      startProgress = progressRef.current;
      viewport.setAttribute("data-dragging", "");
      viewport.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (!lockAxis) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        lockAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }

      if (lockAxis === "y") {
        endDrag(event.pointerId);
        return;
      }

      event.preventDefault();
      moved = true;

      const maxIndex = Math.max(1, CASE_SLIDES.length - 1);
      const deltaProgress = (-dx / SWIPE_PIXELS_PER_SLIDE) / maxIndex;
      const next = clamp01(startProgress + deltaProgress);

      progressRef.current = next;
      applyRing(next);
    };

    const onPointerUp = (event: PointerEvent) => {
      endDrag(event.pointerId);
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
    };
  }, [applyRing]);

  const initialSlide = CASE_SLIDES[0];

  return (
    <section className="cases-carousel" aria-label="Eksempler">
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
            <div
              ref={viewportRef}
              className="cases-carousel__viewport"
              aria-roledescription="carousel"
            >
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
                    onClick={() => goToIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

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
