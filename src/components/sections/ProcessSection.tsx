import { ProcessStep } from "@/components/ui/ProcessStep";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROCESS_HEADER, PROCESS_STEPS } from "@/lib/processContent";

export function ProcessSection() {
  return (
    <section
      id="proces"
      data-section="process"
      className="vintage-paper-section section-padding"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={PROCESS_HEADER.title}
            subtitle={PROCESS_HEADER.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 90}>
              <ProcessStep
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
