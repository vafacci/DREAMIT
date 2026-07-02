"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  PROBLEM_HEADER,
  PROBLEM_STEPS,
  type ProblemStep,
} from "@/lib/problemContent";
import { bindScrollTriggerRefresh, loadGsapScroll } from "@/lib/gsapScroll";
import { isMobileDevice } from "@/lib/isMobileDevice";
import {
  PROBLEM_PANEL_COUNT,
  getProblemScrollHeight,
  getProblemScrollScrub,
} from "@/lib/problemScrollConstants";
import { getProblemPanelTransform } from "@/lib/problemScrollMath";

type PanelSetters = {
  opacity: (value: number) => void;
  transform: (value: string) => void;
  element: HTMLElement;
};

const imageFrameClass =
  "relative mt-2 min-h-[42dvh] w-full flex-1 sm:min-h-[44dvh] lg:min-h-[48dvh]";

function ProblemImageFrame({
  showImage,
  src,
  alt,
  priority = false,
  imageClassName = "object-cover object-bottom",
}: {
  showImage: boolean;
  src: string;
  alt: string;
  priority?: boolean;
  imageClassName?: string;
}) {
  if (!showImage) {
    return <div className={imageFrameClass} aria-hidden="true" />;
  }

  return (
    <div className={imageFrameClass}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes="(max-width: 1024px) 100vw, 720px"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    </div>
  );
}

function ProblemIntroPanel({
  fillViewport = true,
  showImage = true,
  priorityImage = false,
}: {
  fillViewport?: boolean;
  showImage?: boolean;
  priorityImage?: boolean;
}) {
  return (
    <div
      className={
        fillViewport
          ? "container-site flex h-full flex-col pt-20 pb-8 lg:pt-24 lg:pb-10"
          : "flex flex-col"
      }
    >
      <div className="mb-4 shrink-0 lg:mb-5">
        <SectionHeader
          label={PROBLEM_HEADER.label}
          title={PROBLEM_HEADER.title}
          subtitle={PROBLEM_HEADER.subtitle}
        />
      </div>

      <ProblemImageFrame
        showImage={showImage}
        src={PROBLEM_HEADER.image.src}
        alt={PROBLEM_HEADER.image.alt}
        priority={priorityImage}
      />
    </div>
  );
}

function ProblemStepPanel({
  step,
  showImage = true,
}: {
  step: ProblemStep;
  showImage?: boolean;
}) {
  return (
    <div className="container-site flex h-full flex-col pt-20 pb-8 lg:pt-24 lg:pb-10">
      <div className="mb-4 flex shrink-0 items-baseline justify-between gap-4 lg:mb-5">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-heading text-xl uppercase tracking-[0.06em] text-black lg:text-2xl">
            {step.title}
          </h3>
          <p className="text-body text-black/60">{step.subtitle}</p>
        </div>
        <span className="shrink-0 font-heading text-2xl leading-none text-brand lg:text-3xl">
          {step.number}
        </span>
      </div>

      <ProblemImageFrame
        showImage={showImage}
        src={step.image.src}
        alt={step.image.alt}
        imageClassName="object-cover"
      />
    </div>
  );
}

function ProblemStaticFallback() {
  return (
    <section
      id="hvad-vi-goer"
      data-section="problem"
      className="vintage-paper-section section-padding text-black"
    >
      <div className="container-site">
        <ProblemIntroPanel fillViewport={false} />

        <ul className="flex flex-col gap-14 pt-14">
          {PROBLEM_STEPS.map((step) => (
            <li key={step.title}>
              <ProblemStepPanel step={step} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function applyPanelTransform(
  setters: PanelSetters,
  panelIndex: number,
  progress: number,
  lite: boolean,
) {
  const t = getProblemPanelTransform(
    panelIndex,
    progress,
    PROBLEM_PANEL_COUNT,
    lite,
  );

  setters.opacity(t.opacity);
  setters.element.style.zIndex = String(t.zIndex);
  setters.element.style.pointerEvents = t.pointerEvents;
  setters.element.style.visibility = t.opacity < 0.001 ? "hidden" : "visible";

  if (lite) {
    setters.transform("none");
    return;
  }

  setters.transform(
    `translate3d(0, ${t.translateY}px, ${t.translateZ}px) rotateX(${t.rotateX}deg) scale(${t.scale})`,
  );

  const content = setters.element.firstElementChild as HTMLElement | null;
  if (content) {
    content.style.transform = `translate3d(0, ${t.contentY}px, 0)`;
  }
}

export function ProblemScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const activeImageRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(() =>
    getProblemScrollHeight(false),
  );
  const [liteMotion, setLiteMotion] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mobile = isMobileDevice();
    const height = getProblemScrollHeight(mobile);
    setScrollHeight(height);
    setLiteMotion(mobile);
    section.style.height = height;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let unbindRefresh: (() => void) | undefined;
    let rafId = 0;
    let attempts = 0;

    void loadGsapScroll().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const lite = mobile;

      const init = () => {
        const panels = panelsRef.current.filter(Boolean) as HTMLElement[];
        if (panels.length !== PROBLEM_PANEL_COUNT) return false;

        const setters = panels.map((panel) => {
          gsap.set(panel, { force3D: !lite });
          return {
            element: panel,
            opacity: gsap.quickSetter(panel, "opacity") as (value: number) => void,
            transform: gsap.quickSetter(panel, "transform") as (value: string) => void,
          };
        }) satisfies PanelSetters[];

        const update = (progress: number) => {
          setters.forEach((setter, index) => {
            applyPanelTransform(setter, index, progress, lite);
          });

          if (lite) {
            const nextIndex = Math.min(
              PROBLEM_PANEL_COUNT - 1,
              Math.max(0, Math.round(progress * (PROBLEM_PANEL_COUNT - 1))),
            );
            if (nextIndex !== activeImageRef.current) {
              activeImageRef.current = nextIndex;
              setActiveImageIndex(nextIndex);
            }
          }
        };

        update(0);

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            id: "problem-scroll",
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: getProblemScrollScrub(mobile),
            fastScrollEnd: mobile,
            anticipatePin: 0,
            invalidateOnRefresh: true,
            onUpdate: (self) => update(self.progress),
          });
        }, section);

        const refresh = () => {
          ScrollTrigger.refresh();
          const trigger = ScrollTrigger.getById("problem-scroll");
          if (trigger) update(trigger.progress);
        };

        refresh();
        unbindRefresh = bindScrollTriggerRefresh(refresh, mobile);
        return true;
      };

      const tryInit = () => {
        attempts += 1;
        if (init() || attempts >= 60) {
          cancelAnimationFrame(rafId);
          return;
        }
        rafId = requestAnimationFrame(tryInit);
      };

      tryInit();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      unbindRefresh?.();
      ctx?.revert();
    };
  }, []);

  if (reducedMotion) {
    return <ProblemStaticFallback />;
  }

  const panelClass = liteMotion
    ? "absolute inset-0 overflow-hidden"
    : "absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform-style:preserve-3d]";

  return (
    <section
      ref={sectionRef}
      id="hvad-vi-goer"
      data-section="problem"
      className="relative z-0 -mt-[100dvh] bg-[#f1f1e9]"
      style={{ height: scrollHeight }}
      aria-label="Problemet"
    >
      <div
        className="sticky top-0 h-[100dvh] overflow-hidden bg-[#f1f1e9] [contain:layout_paint] [transform:translateZ(0)]"
        style={liteMotion ? undefined : { perspective: "1400px" }}
      >
        <div
          className="relative h-full w-full"
          style={liteMotion ? undefined : { transformStyle: "preserve-3d" }}
        >
          <article
            ref={(el) => {
              panelsRef.current[0] = el;
            }}
            className={panelClass}
          >
            <div className="vintage-paper-section h-full w-full">
              <ProblemIntroPanel
                showImage={!liteMotion || activeImageIndex === 0}
                priorityImage={!liteMotion}
              />
            </div>
          </article>

          {PROBLEM_STEPS.map((step, index) => (
            <article
              key={step.title}
              ref={(el) => {
                panelsRef.current[index + 1] = el;
              }}
              className={`${panelClass} opacity-0 invisible`}
            >
              <div className="vintage-paper-section h-full w-full">
                <ProblemStepPanel
                  step={step}
                  showImage={!liteMotion || activeImageIndex === index + 1}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
