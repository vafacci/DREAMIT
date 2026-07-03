import { PackageCard } from "@/components/ui/PackageCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PACKAGES, PACKAGES_HEADER } from "@/lib/packagesContent";

export function PackagesSection() {
  return (
    <section
      id="pakker"
      data-section="packages"
      className="section-padding bg-dream-paper"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            title={PACKAGES_HEADER.title}
            subtitle={PACKAGES_HEADER.subtitle}
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl items-stretch gap-6 sm:grid-cols-2 lg:gap-8">
          {PACKAGES.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 90}>
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

        <Reveal className="mt-12 text-center" delay={200}>
          <p className="text-body text-dream-muted-dark">
            Usikker på hvilken pakke? Book et møde — så finder vi det rigtige
            sammen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
