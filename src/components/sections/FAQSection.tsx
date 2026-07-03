import { FAQItem } from "@/components/ui/FAQItem";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ_HEADER, FAQ_ITEMS } from "@/lib/faqContent";

export function FAQSection() {
  return (
    <section
      id="faq"
      data-section="faq"
      className="section-padding bg-dream-paper"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={FAQ_HEADER.title}
            subtitle={FAQ_HEADER.subtitle}
          />
        </Reveal>

        <Reveal className="mt-12 max-w-2xl" delay={100}>
          {FAQ_ITEMS.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
