import Image from "next/image";
import logoBrand from "@/assets/logo-brand.webp";
import logoSymbol from "@/assets/logo-symbol.webp";

const LOGO_HEIGHT = "h-8 lg:h-9";

type LogoPartProps = {
  className?: string;
};

export function LogoSymbol({
  className = `${LOGO_HEIGHT} w-8 shrink-0 lg:w-9`,
}: LogoPartProps) {
  return (
    <Image
      src={logoSymbol}
      alt=""
      className={`object-contain ${className}`}
      priority
      sizes="36px"
      aria-hidden
    />
  );
}

export function LogoWordmark({
  className = `${LOGO_HEIGHT} w-auto shrink-0`,
}: LogoPartProps) {
  return (
    <Image
      src={logoBrand}
      alt=""
      className={`object-contain ${className}`}
      priority
      sizes="120px"
      aria-hidden
    />
  );
}

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 lg:gap-3 ${className}`}
    >
      <LogoSymbol />
      <LogoWordmark />
    </span>
  );
}
