import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TRUST_HEADER, TRUST_ITEMS } from "@/lib/trustContent";

export function TrustSection() {
  return (
    <section
      data-section="trust"
      className="vintage-paper-section section-padding"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={TRUST_HEADER.title}
            subtitle={TRUST_HEADER.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TRUST_ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={index * 60}>
              <article className="h-full bg-dream-paper/60 p-6 shadow-[0_12px_36px_-24px_rgba(28,45,122,0.1)] transition-transform duration-300 hover:-translate-y-0.5">
                <h3 className="font-heading mb-2 text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-body text-dream-muted-dark">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
