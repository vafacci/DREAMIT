type SectionHeaderProps = {
  label?: string;
  title: string;
  subtitle: string;
  inverted?: boolean;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  subtitle,
  inverted = false,
  className = "",
}: SectionHeaderProps) {
  const textMuted = inverted ? "text-white/65" : "text-black/60";

  return (
    <div className={`max-w-xl ${className}`}>
      {label && (
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
          {label}
        </p>
      )}
      <h2
        className={`font-heading mb-4 text-[2.5rem] uppercase leading-[0.92] tracking-[0.05em] lg:text-[3.5rem] ${
          inverted ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <p className={`text-body ${textMuted}`}>{subtitle}</p>
    </div>
  );
}
