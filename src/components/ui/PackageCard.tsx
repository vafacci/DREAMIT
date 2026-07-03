import { Card } from "./Card";

type PackageCardProps = {
  name: string;
  tagline: string;
  fullPrice: string;
  upfrontPrice: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

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
    <Card
      className={`flex h-full flex-col gap-5 text-dream-text-dark motion-reduce:animate-none ${
        highlighted
          ? "package-card--featured border border-dream-primary ring-1 ring-dream-primary/20"
          : "transition-shadow duration-300 hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.2)]"
      }`}
    >
      {badge ? (
        <p
          className={`text-[10px] font-medium uppercase tracking-[0.18em] text-dream-primary motion-reduce:animate-none ${
            highlighted ? "package-card__badge" : ""
          }`}
        >
          {badge}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-2xl leading-tight">{name}</h3>
        <p className="text-body text-dream-muted-dark">{tagline}</p>
      </div>

      <div className="border-t border-dream-border-dark pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-dream-muted-dark">
          Samlet pris
        </p>
        <p className="font-heading mt-1 text-xl text-dream-muted-dark line-through decoration-dream-primary/50">
          Fra {fullPrice}
        </p>
        <p className="font-heading mt-3 text-3xl leading-none text-dream-text-dark">
          {upfrontPrice}
        </p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-dream-muted-dark">
          ved opstart
        </p>
      </div>

      <ul className="flex flex-col gap-2 text-body text-dream-text-dark/80">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-dream-primary">·</span>
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}
