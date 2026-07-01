import Link from "next/link";
import { type ComponentPropsWithoutRef, type MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "secondary-inverted" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:opacity-90 active:opacity-80",
  secondary:
    "border border-black text-black hover:bg-black hover:text-white",
  "secondary-inverted":
    "border border-white text-white hover:bg-white hover:text-black",
  ghost:
    "text-black underline decoration-brand underline-offset-4 hover:opacity-70",
};

const baseStyles =
  "inline-flex items-center justify-center min-h-[52px] px-8 text-[15px] font-medium tracking-wide transition-all duration-200 rounded-[2px]";

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
