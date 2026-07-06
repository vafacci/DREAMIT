import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_EMAIL, CTA_PRIMARY } from "@/lib/constants";

export function FinalCTASection() {
  return (
    <section
      id="kontakt"
      data-section="contact"
      className="section-padding bg-white text-dream-text-dark"
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading mb-5 text-[2.5rem] uppercase leading-[0.92] tracking-[0.04em] lg:text-[3.5rem]">
            Klar til at gøre din idé virkelig?
          </h2>
          <p className="text-body mb-10 text-dream-text-dark/75">
            Book et uforpligtende møde — så taler vi om din idé, hvor du er,
            og hvordan vi kan hjælpe dig videre.
          </p>
          <Button
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Book et møde med DREAMit")}`}
            primaryCta
          >
            {CTA_PRIMARY}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
