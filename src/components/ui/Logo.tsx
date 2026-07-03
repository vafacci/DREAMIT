import logoSymbol from "@/assets/dreamit-orbit-logo-gradient-exact.svg";

const HEADER_LOGO = "h-8 w-8 shrink-0 lg:h-9 lg:w-9";

type LogoPartProps = {
  className?: string;
};

function logoSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src;
}

export function LogoSymbol({
  className = HEADER_LOGO,
}: LogoPartProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc(logoSymbol)}
      alt=""
      className={`object-contain ${className}`}
      aria-hidden
      decoding="async"
    />
  );
}

export function LogoWordmark({
  className = "font-heading text-lg tracking-tight text-dream-text lg:text-xl",
}: LogoPartProps) {
  return (
    <span className={className} aria-hidden>
      DREAM<span className="text-dream-gradient italic">it</span>
    </span>
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
