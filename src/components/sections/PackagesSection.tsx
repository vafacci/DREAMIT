import { PackageCard } from "@/components/ui/PackageCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PACKAGES, PACKAGES_HEADER } from "@/lib/packagesContent";

export function PackagesSection() {
  return (
    <section
      id="pakker"
      data-section="packages"
      data-hide-sticky-cta
      className="section-padding bg-dream-bg text-dream-text"
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeader
            inverted
            label={PACKAGES_HEADER.label}
            title={PACKAGES_HEADER.title}
            lead={PACKAGES_HEADER.lead}
            subtitle={PACKAGES_HEADER.subtitle}
            className="mx-auto max-w-2xl text-center"
          />
        </Reveal>

        <div className="pricing-cards-grid mx-auto mt-14 max-w-5xl">
          {PACKAGES.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 100} className="h-full">
              <PackageCard
                name={pkg.name}
                tagline={pkg.tagline}
                fullPrice={pkg.fullPrice}
                upfrontPrice={pkg.upfrontPrice}
                features={[...pkg.features]}
                highlighted={pkg.highlighted}
                badge={"badge" in pkg ? pkg.badge : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
