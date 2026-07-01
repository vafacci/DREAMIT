import { Button } from "@/components/ui/Button";
import {
  CTA_PRIMARY,
  CTA_PRIMARY_HREF,
  CTA_SECONDARY,
  CTA_SECONDARY_HREF,
} from "@/lib/constants";

export function Hero() {
  return (
    <section data-section="hero" className="relative">
      <div className="absolute inset-0 z-0 bg-white" aria-hidden="true" />
      <div className="container-site relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col justify-center pb-16 pt-10 lg:min-h-[calc(100dvh-5rem)] lg:pb-24 lg:pt-16">
        <h1 className="text-h1-mobile lg:text-h1-desktop mb-8 max-w-4xl tracking-[0.02em]">
          fra <span className="uppercase">hobby</span>
          <br />
          til <span className="uppercase">webshop</span>
        </h1>

        <p className="text-body mb-10 max-w-md text-black/80">
          Har du et produkt, en idé eller en kreativ drøm, du gerne vil sælge? Vi
          hjælper dig med navn, visuel stil, webshop og launch — så du kan komme
          professionelt online.
        </p>

        <div className="mb-10 flex w-full flex-col gap-3 sm:max-w-sm">
          <Button href={CTA_PRIMARY_HREF} className="w-full">
            {CTA_PRIMARY}
          </Button>
          <Button href={CTA_SECONDARY_HREF} variant="secondary" className="w-full">
            {CTA_SECONDARY}
          </Button>
        </div>

        <p className="text-[13px] leading-relaxed text-black/50">
          Til kreative iværksættere, hobbybrands og små produktdrømme.
        </p>
      </div>
    </section>
  );
}
