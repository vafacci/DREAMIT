import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONTACT_EMAIL, CTA_PRIMARY } from "@/lib/constants";
import { FINAL_CTA } from "@/lib/finalCtaContent";

export function FinalCTASection() {
  return (
    <section
      id="kontakt"
      data-section="contact"
      data-hide-sticky-cta
      className="final-cta bg-white text-dream-text-dark"
    >
      <div className="final-cta__grid">
        <div className="final-cta__media">
          <Image
            src="/images/book-meeting.png"
            alt="To personer i samtale ved en laptop — book et møde med DREAMit"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="final-cta__image"
            priority={false}
          />
        </div>

        <div className="final-cta__content section-padding">
          <Reveal className="final-cta__inner">
            <SectionHeader
              title={FINAL_CTA.title}
              lead={FINAL_CTA.lead}
              subtitle={FINAL_CTA.body}
            />
            <div className="mt-10">
              <Button
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Book et møde med DREAMit")}`}
                primaryCta
              >
                {CTA_PRIMARY}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
