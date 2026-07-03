type ProcessStepProps = {
  number: number;
  title: string;
  description?: string;
  inverted?: boolean;
};

export function ProcessStep({
  number,
  title,
  description,
  inverted = false,
}: ProcessStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-heading text-4xl leading-none text-dream-primary">
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="font-heading text-xl leading-tight">{title}</h3>
      {description && (
        <p
          className={`text-body ${inverted ? "text-dream-muted" : "text-dream-muted-dark"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
