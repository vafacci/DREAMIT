"use client";

import Image from "next/image";
import { useState } from "react";
import { FlipReveal } from "@/components/ui/FlipReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROBLEM_HEADER, PROBLEM_STEPS } from "@/lib/problemContent";

function EditorialImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex h-full min-h-[220px] w-full items-end bg-gradient-to-br from-[#e8e4d8] via-[#f1f1e9] to-[#ddd8cb] p-6"
        aria-hidden={alt === ""}
      >
        <span className="text-[11px] uppercase tracking-[0.18em] text-dream-muted-dark/60">
          Editorial placeholder
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center"
      sizes="(max-width: 1024px) 100vw, 50vw"
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}

function ProblemPillarWord({ children }: { children: string }) {
  return <span className="problem-pillar-word">{children}</span>;
}

function ProblemIntro() {
  const { before, after, pillars } = PROBLEM_HEADER.intro;

  return (
    <p className="text-body max-w-lg text-dream-text-dark/75">
      {before}{" "}
      {pillars.map((word, index) => (
        <span key={word}>
          {index > 0 && (index === pillars.length - 1 ? " og " : ", ")}
          <ProblemPillarWord>{word}</ProblemPillarWord>
        </span>
      ))}
      . {after}
    </p>
  );
}

function ProblemCardBack({
  title,
  index,
}: {
  title: string;
  index: number;
}) {
  return (
    <div className="flip-card-back h-full min-h-[280px]">
      <span className="flip-card-back__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flip-card-back__title">{title}</span>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section
      id="problemet"
      data-section="problem"
      className="problem-section section-peek-overlap relative z-0 section-padding bg-white pt-6 lg:pt-[var(--spacing-section-y)]"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={PROBLEM_HEADER.title}
            subtitle={<ProblemIntro />}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {PROBLEM_STEPS.map((step, index) => (
            <FlipReveal
              key={step.title}
              delay={index * 120}
              back={<ProblemCardBack title={step.title} index={index} />}
              front={
                <article className="problem-card group flex h-full flex-col">
                  <div className="problem-card__image">
                    <EditorialImage
                      src={step.image.src}
                      alt={step.image.alt}
                      priority={index === 0}
                    />
                  </div>
                  <div className="problem-card__body">
                    <h3 className="problem-card__title font-heading text-2xl uppercase tracking-[0.04em]">
                      {step.title}
                    </h3>
                    <p className="text-body text-dream-text-dark/75">{step.pain}</p>
                    <p className="mt-1.5 text-sm leading-snug text-dream-primary">{step.help}</p>
                  </div>
                </article>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
