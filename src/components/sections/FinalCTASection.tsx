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
      className="final-cta section-padding text-dream-text-dark"
    >
      <div className="final-cta__backdrop" aria-hidden>
        <div className="final-cta__backdrop-scrim" />
      </div>

      <div className="container-site relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeader
            title={FINAL_CTA.title}
            lead={FINAL_CTA.lead}
            subtitle={FINAL_CTA.body}
            className="mx-auto max-w-2xl text-center"
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
    </section>
  );
}
