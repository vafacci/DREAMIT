import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  OUTCOMES,
  OUTCOMES_HEADER,
  OUTCOMES_INCLUDED,
  OUTCOMES_INCLUDED_LABEL,
} from "@/lib/outcomesContent";

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0 text-dream-primary"
    >
      <path
        d="M3 8.2 6 11.2 13 4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OutcomesSection() {
  return (
    <section
      id="resultater"
      data-section="outcomes"
      className="section-padding bg-white text-dream-text-dark"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={OUTCOMES_HEADER.title}
            subtitle={OUTCOMES_HEADER.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:items-start">
          <ul className="flex flex-col gap-8">
            {OUTCOMES.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <li className="flex gap-4">
                  <CheckIcon />
                  <div>
                    <h3 className="font-heading text-xl leading-tight">{item.title}</h3>
                    <p className="text-body mt-2 text-dream-muted-dark">
                      {item.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <aside className="outcomes-included-card lg:sticky lg:top-28">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-dream-primary">
                {OUTCOMES_INCLUDED_LABEL}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {OUTCOMES_INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-dream-border-paper pb-3 text-sm text-dream-text-dark/85 last:border-0 last:pb-0"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-dream-primary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
