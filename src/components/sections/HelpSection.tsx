import { ProcessStep } from "@/components/ui/ProcessStep";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  HELP_BENEFITS,
  HELP_HEADER,
  HELP_PROCESS,
  HELP_PROCESS_LABEL,
  HELP_TRUST_STRIP,
} from "@/lib/helpContent";

export function HelpSection() {
  return (
    <section
      id="hvordan-vi-hjaelper"
      data-section="help"
      className="section-padding bg-dream-bg text-dream-text"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={HELP_HEADER.title}
            subtitle={HELP_HEADER.subtitle}
            inverted
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {HELP_BENEFITS.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <article className="help-benefit-card h-full">
                <h3 className="font-heading text-xl leading-tight">{item.title}</h3>
                <p className="text-body mt-3 text-dream-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 border-t border-dream-border pt-16">
          <Reveal delay={60}>
            <p className="mb-12 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-dream-primary-soft">
              {HELP_PROCESS_LABEL}
            </p>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {HELP_PROCESS.map((step, index) => (
              <Reveal key={step.number} delay={index * 100}>
                <ProcessStep
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  inverted
                />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16" delay={120}>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-dream-muted">
            {HELP_TRUST_STRIP.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-dream-primary-soft" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
