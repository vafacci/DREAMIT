import { PackageCard } from "@/components/ui/PackageCard";
import { Reveal } from "@/components/ui/Reveal";
import { PACKAGES, PACKAGES_HEADER } from "@/lib/packagesContent";

export function PackagesSection() {
  return (
    <section
      id="pakker"
      data-section="packages"
      className="pricing-section section-padding relative overflow-hidden bg-dream-bg text-dream-text"
    >
      <div className="pricing-section__grid" aria-hidden />
      <div className="pricing-section__glow" aria-hidden />

      <div className="container-site relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="pricing-section__label">{PACKAGES_HEADER.label}</span>
          <h2 className="font-heading mt-6 text-[2.25rem] leading-[0.95] tracking-tight sm:text-[2.75rem]">
            {PACKAGES_HEADER.title}
          </h2>
          <p className="text-body mt-4 text-dream-muted">{PACKAGES_HEADER.subtitle}</p>
        </Reveal>

        <div className="pricing-board mx-auto mt-14 max-w-4xl">
          <div className="pricing-board__grid">
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
      </div>
    </section>
  );
}
