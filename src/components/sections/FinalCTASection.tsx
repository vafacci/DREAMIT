import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_EMAIL, CTA_PRIMARY } from "@/lib/constants";

export function FinalCTASection() {
  return (
    <section
      id="kontakt"
      data-section="contact"
      className="section-padding relative overflow-hidden bg-dream-gradient text-dream-text"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, var(--dream-glow-strong), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="container-site relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading mb-5 text-[2.5rem] uppercase leading-[0.92] tracking-[0.04em] lg:text-[3.5rem]">
            Klar til at gøre din idé virkelig?
          </h2>
          <p className="text-body mb-10 text-dream-text/90">
            Book et uforpligtende møde — så taler vi om din idé, hvor du er,
            og hvordan vi kan hjælpe dig videre.
          </p>
          <Button
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Book et møde med DREAMit")}`}
            variant="secondary-inverted"
            className="border-dream-text bg-dream-text text-dream-primary-dark hover:bg-dream-paper hover:text-dream-primary-dark"
          >
            {CTA_PRIMARY}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
