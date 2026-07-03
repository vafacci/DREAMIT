import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SHOWCASE_CASES, SHOWCASE_HEADER } from "@/lib/showcaseContent";

export function ShowcaseSection() {
  return (
    <section
      id="cases"
      data-section="showcase"
      className="section-padding bg-dream-surface-soft text-dream-text"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={SHOWCASE_HEADER.title}
            subtitle={SHOWCASE_HEADER.subtitle}
            inverted
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {SHOWCASE_CASES.map((item, index) => (
            <Reveal key={item.name} delay={index * 90}>
              <article className="flex h-full flex-col overflow-hidden border border-dream-border bg-white/[0.03]">
                <div className="grid grid-cols-2 border-b border-dream-border">
                  <div className="border-r border-dream-border bg-dream-bg p-5">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-dream-muted">
                      Før
                    </p>
                    <p className="text-sm leading-relaxed text-dream-muted">
                      {item.before}
                    </p>
                  </div>
                  <div className="bg-dream-gradient-soft p-5">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-dream-primary-soft">
                      Efter
                    </p>
                    <p className="text-sm leading-relaxed text-dream-text">
                      {item.after}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-dream-muted">
                    {item.tag}
                  </span>
                  <h3 className="font-heading text-2xl leading-tight">{item.name}</h3>
                  <div className="mt-auto h-28 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
