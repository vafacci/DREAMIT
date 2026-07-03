import Link from "next/link";
import { type ComponentPropsWithoutRef, type MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "secondary-inverted" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
  primaryCta?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "btn-dream-gradient shadow-[0_6px_20px_-6px_rgba(76,63,217,0.5)] hover:opacity-95 active:opacity-90",
  secondary:
    "border border-dream-text-dark text-dream-text-dark hover:bg-dream-text-dark hover:text-dream-paper",
  "secondary-inverted":
    "border border-dream-border text-dream-text hover:bg-white/5 active:bg-white/10",
  ghost:
    "text-dream-text-dark underline decoration-dream-primary underline-offset-4 hover:opacity-70",
};

const baseStyles =
  "inline-flex items-center justify-center min-h-[38px] px-5 text-[11px] font-medium uppercase tracking-[0.12em] rounded-full transition-all duration-200";

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  onClick,
  primaryCta,
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;
  const ctaProps = primaryCta ? { "data-primary-cta": true } : {};

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        {...ctaProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...ctaProps} {...props}>
      {children}
    </button>
  );
}
