import type { ReactNode } from "react";

type SectionHeaderProps = {
  label?: string;
  title: string;
  lead?: string;
  subtitle?: ReactNode;
  inverted?: boolean;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  lead,
  subtitle,
  inverted = false,
  className = "",
}: SectionHeaderProps) {
  const textMuted = inverted ? "text-dream-muted" : "text-dream-muted-dark";
  const leadColor = inverted ? "text-dream-text/90" : "text-dream-text-dark/80";

  return (
    <div className={`max-w-xl ${className}`}>
      {label && (
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-dream-primary">
          {label}
        </p>
      )}
      <h2
        className={`font-heading mb-3 text-[2.5rem] uppercase leading-[0.92] tracking-[0.05em] lg:text-[3.5rem] ${
          inverted ? "text-dream-text" : "text-dream-text-dark"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mb-3 text-lg leading-snug ${leadColor}`}>{lead}</p>
      )}
      {subtitle && (
        <div className={`text-body mx-auto max-w-lg ${textMuted}`}>{subtitle}</div>
      )}
    </div>
  );
}
