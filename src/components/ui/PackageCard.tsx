import Link from "next/link";
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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-dream-primary-soft"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M5 8.2 7 10.2 11 6.2"
        stroke="currentColor"
        strokeWidth="1.25"
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
  badge = "Anbefalet",
}: PackageCardProps) {
  return (
    <article
      className={`pricing-card motion-reduce:animate-none ${
        highlighted ? "pricing-card--featured package-card--featured" : "pricing-card--standard"
      }`}
    >
      {highlighted ? <div className="pricing-card__glow" aria-hidden /> : null}

      <div className="pricing-card__inner">
        {badge ? (
          <span
            className={`pricing-card__badge ${
              highlighted ? "package-card__badge motion-reduce:animate-none" : ""
            }`}
          >
            {badge}
          </span>
        ) : null}

        <div>
          <h3 className="font-heading text-2xl leading-tight text-dream-text">{name}</h3>
          <p className="mt-1 text-sm text-dream-muted">{tagline}</p>
        </div>

        <div className="pricing-card__price">
          <p className="text-sm text-dream-muted line-through decoration-dream-primary/40">
            Fra {fullPrice}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="font-heading text-4xl leading-none text-dream-text">{upfrontPrice}</p>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-dream-muted">
              ved opstart
            </span>
          </div>
        </div>

        <Link
          href={CTA_PRIMARY_HREF}
          className={`pricing-card__cta ${highlighted ? "pricing-card__cta--featured" : ""}`}
          {...(highlighted ? { "data-primary-cta": true } : {})}
        >
          {CTA_PRIMARY}
          <span aria-hidden> →</span>
        </Link>

        <div className="pricing-card__features">
          <p className="pricing-card__features-label">Inkluderet</p>
          <ul className="flex flex-col gap-2.5">
            {features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm text-dream-muted">
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
