import { ProcessStep } from "@/components/ui/ProcessStep";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  HELP_HEADER,
  HELP_PROCESS,
  HELP_PROCESS_LABEL,
  HELP_SERVICES,
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

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {HELP_SERVICES.map((item, index) => (
            <Reveal key={item.pillar} delay={index * 70}>
              <article className="flex h-full flex-col gap-3 border border-dream-border bg-dream-surface p-6 transition-colors duration-300 hover:border-dream-primary/40">
                <p className="help-pillar-label font-heading text-sm uppercase tracking-[0.14em]">
                  {item.pillar}
                </p>
                <h3 className="font-heading text-xl leading-tight">{item.title}</h3>
                <p className="text-body text-dream-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20" delay={80}>
          <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.2em] text-dream-primary-soft">
            {HELP_PROCESS_LABEL}
          </p>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {HELP_PROCESS.map((step, index) => (
            <Reveal key={step.number} delay={index * 90}>
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
    </section>
  );
}
