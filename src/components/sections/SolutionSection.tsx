import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SOLUTION_HEADER, SOLUTION_ITEMS } from "@/lib/solutionContent";

export function SolutionSection() {
  return (
    <section
      id="hvad-vi-goer"
      data-section="solution"
      className="section-padding bg-dream-surface text-dream-text"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={SOLUTION_HEADER.title}
            subtitle={SOLUTION_HEADER.subtitle}
            inverted
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SOLUTION_ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="flex h-full flex-col gap-3 border border-dream-border bg-white/[0.03] p-6 transition-colors duration-300 hover:border-dream-primary/40 hover:bg-white/[0.05]">
                <span className="font-heading text-3xl leading-none text-dream-primary-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl leading-tight">{item.title}</h3>
                <p className="text-body text-dream-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
