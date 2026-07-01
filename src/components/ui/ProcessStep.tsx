type ProcessStepProps = {
  number: number;
  title: string;
  description?: string;
};

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-heading text-4xl text-brand leading-none">
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="font-heading text-xl leading-tight">{title}</h3>
      {description && <p className="text-body text-black/70">{description}</p>}
    </div>
  );
}
