"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  PROBLEM_HEADER,
  PROBLEM_STEPS,
  type ProblemStep,
} from "@/lib/problemContent";
import {
  PROBLEM_PANEL_COUNT,
  PROBLEM_SCROLL_HEIGHT,
  PROBLEM_SCROLL_SCRUB,
} from "@/lib/problemScrollConstants";
import { getProblemPanelTransform } from "@/lib/problemScrollMath";

gsap.registerPlugin(ScrollTrigger);

function ProblemIntroPanel({ fillViewport = true }: { fillViewport?: boolean }) {
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

      <div
        className={
          fillViewport
            ? "relative mt-2 min-h-[42dvh] w-full flex-1 sm:min-h-[44dvh] lg:min-h-[48dvh]"
            : "relative mt-2 aspect-[4/5] w-full sm:aspect-[3/4]"
        }
      >
        <Image
          src={PROBLEM_HEADER.image.src}
          alt={PROBLEM_HEADER.image.alt}
          fill
          className="object-cover object-bottom"
          sizes="(max-width: 1024px) 100vw, 720px"
          priority
        />
      </div>
    </div>
  );
}

function ProblemStepPanel({ step }: { step: ProblemStep }) {
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

      <div className="relative mt-2 min-h-[42dvh] w-full flex-1 sm:min-h-[44dvh] lg:min-h-[48dvh]">
        <Image
          src={step.image.src}
          alt={step.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 720px"
          priority={step.number === "01"}
        />
      </div>
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
  panel: HTMLElement,
  panelIndex: number,
  progress: number,
) {
  const t = getProblemPanelTransform(panelIndex, progress, PROBLEM_PANEL_COUNT);
  const content = panel.firstElementChild as HTMLElement | null;

  panel.style.opacity = String(t.opacity);
  panel.style.zIndex = String(t.zIndex);
  panel.style.pointerEvents = t.pointerEvents;
  panel.style.visibility = t.opacity < 0.001 ? "hidden" : "visible";
  panel.style.transform = `translate3d(0, ${t.translateY}px, ${t.translateZ}px) rotateX(${t.rotateX}deg) scale(${t.scale})`;

  if (content) {
    content.style.transform = `translate3d(0, ${t.contentY}px, 0)`;
  }
}

export function ProblemScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
      return;
    }

    let ctx: gsap.Context | undefined;
    let refreshHandler: (() => void) | undefined;

    const init = () => {
      const panels = panelsRef.current.filter(Boolean) as HTMLElement[];
      if (panels.length !== PROBLEM_PANEL_COUNT) return false;

      const update = (progress: number) => {
        panels.forEach((panel, index) => {
          applyPanelTransform(panel, index, progress);
        });
      };

      update(0);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          id: "problem-scroll",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: PROBLEM_SCROLL_SCRUB,
          invalidateOnRefresh: true,
          onUpdate: (self) => update(self.progress),
        });
      }, section);

      refreshHandler = () => {
        ScrollTrigger.refresh();
        const trigger = ScrollTrigger.getById("problem-scroll");
        if (trigger) update(trigger.progress);
      };

      refreshHandler();
      window.addEventListener("load", refreshHandler);
      window.addEventListener("resize", refreshHandler);
      return true;
    };

    const tryInit = () => {
      if (!init()) requestAnimationFrame(tryInit);
    };

    tryInit();

    return () => {
      if (refreshHandler) {
        window.removeEventListener("load", refreshHandler);
        window.removeEventListener("resize", refreshHandler);
      }
      ctx?.revert();
    };
  }, []);

  if (reducedMotion) {
    return <ProblemStaticFallback />;
  }

  return (
    <section
      ref={sectionRef}
      id="hvad-vi-goer"
      data-section="problem"
      className="relative bg-[#f1f1e9]"
      style={{ height: PROBLEM_SCROLL_HEIGHT }}
      aria-label="Problemet"
    >
      <div
        className="sticky top-0 h-[100dvh] overflow-hidden bg-[#f1f1e9]"
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <article
            ref={(el) => {
              panelsRef.current[0] = el;
            }}
            className="absolute inset-0 overflow-hidden will-change-transform [backface-visibility:hidden] [transform-style:preserve-3d]"
          >
            <div className="vintage-paper-section h-full w-full will-change-transform">
              <ProblemIntroPanel />
            </div>
          </article>

          {PROBLEM_STEPS.map((step, index) => (
            <article
              key={step.title}
              ref={(el) => {
                panelsRef.current[index + 1] = el;
              }}
              className="absolute inset-0 overflow-hidden opacity-0 invisible will-change-transform [backface-visibility:hidden] [transform-style:preserve-3d]"
            >
              <div className="vintage-paper-section h-full w-full will-change-transform">
                <ProblemStepPanel step={step} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
