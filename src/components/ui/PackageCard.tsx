import { Button } from "@/components/ui/Button";
import { CTA_PRIMARY, CTA_PRIMARY_HREF } from "@/lib/constants";

type PackageCardProps = {
  name: string;
  tagline: string;
  fullPrice: string;
  upfrontPrice: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-dream-text/70"
    >
      <path
        d="M2.5 7.2 5.5 10.2 11.5 4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PackageCard({
  name,
  tagline,
  fullPrice,
  upfrontPrice,
  features,
  highlighted = false,
  badge,
}: PackageCardProps) {
  return (
    <article
      className={`pricing-card motion-reduce:animate-none ${
        highlighted ? "pricing-card--featured package-card--featured" : "pricing-card--standard"
      }`}
    >
      {highlighted ? <div className="pricing-card__glow" aria-hidden /> : null}

      <div className="pricing-card__inner">
        <div className="pricing-card__header">
          <h3 className="font-heading text-2xl leading-tight text-dream-text">{name}</h3>
          {badge ? <span className="pricing-card__badge">{badge}</span> : null}
        </div>

        <div className="pricing-card__price">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <p className="font-heading text-[2.75rem] leading-none tracking-tight text-dream-text sm:text-5xl">
              {upfrontPrice}
            </p>
            <span className="text-sm text-dream-muted">ved opstart</span>
          </div>
          <p className="mt-2 text-sm text-dream-muted">
            <span className="line-through decoration-white/20">Fra {fullPrice}</span>
          </p>
        </div>

        <p className="pricing-card__tagline">{tagline}</p>

        <Button
          href={CTA_PRIMARY_HREF}
          variant={highlighted ? "primary" : "secondary-inverted"}
          className="pricing-card__btn w-full min-h-[44px]"
        >
          {CTA_PRIMARY}
        </Button>

        <ul className="pricing-card__features">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm text-dream-muted">
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
