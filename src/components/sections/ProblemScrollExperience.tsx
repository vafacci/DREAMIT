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
import { ensureGsapScroll } from "@/lib/gsapScroll";
import { isMobileDevice } from "@/lib/isMobileDevice";
import {
  PROBLEM_PANEL_COUNT,
  getProblemScrollHeight,
  getProblemScrollScrub,
} from "@/lib/problemScrollConstants";
import { getProblemPanelTransform } from "@/lib/problemScrollMath";

type PanelSetters = {
  opacity: ReturnType<typeof gsap.quickSetter>;
  transform: ReturnType<typeof gsap.quickSetter>;
  element: HTMLElement;
};

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
          loading="lazy"
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
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(() =>
    getProblemScrollHeight(false),
  );
  const [liteMotion, setLiteMotion] = useState(false);

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

    ensureGsapScroll();

    let ctx: gsap.Context | undefined;
    let refreshHandler: (() => void) | undefined;
    const mobile = isMobileDevice();
    const lite = mobile;

    const init = () => {
      const panels = panelsRef.current.filter(Boolean) as HTMLElement[];
      if (panels.length !== PROBLEM_PANEL_COUNT) return false;

      const setters: PanelSetters[] = panels.map((panel) => {
        gsap.set(panel, { force3D: true });
        return {
          element: panel,
          opacity: gsap.quickSetter(panel, "opacity"),
          transform: gsap.quickSetter(panel, "transform"),
        };
      });

      const update = (progress: number) => {
        setters.forEach((setter, index) => {
          applyPanelTransform(setter, index, progress, lite);
        });
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
          anticipatePin: 1,
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

  const panelClass = liteMotion
    ? "absolute inset-0 overflow-hidden"
    : "absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform-style:preserve-3d]";

  return (
    <section
      ref={sectionRef}
      id="hvad-vi-goer"
      data-section="problem"
      className="relative bg-[#f1f1e9]"
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
              <ProblemIntroPanel />
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
                <ProblemStepPanel step={step} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
