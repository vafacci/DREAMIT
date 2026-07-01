import { Card } from "./Card";

type PackageCardProps = {
  name: string;
  tagline: string;
  price: string;
  features: string[];
  highlighted?: boolean;
};

export function PackageCard({
  name,
  tagline,
  price,
  features,
  highlighted = false,
}: PackageCardProps) {
  return (
    <Card
      className={`flex flex-col gap-6 ${highlighted ? "border-black" : ""}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-2xl leading-tight">{name}</h3>
        <p className="text-body text-black/60">{tagline}</p>
      </div>
      <p className="font-heading text-3xl">{price}</p>
      <ul className="flex flex-col gap-2 text-body text-black/80">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-accent">·</span>
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}
