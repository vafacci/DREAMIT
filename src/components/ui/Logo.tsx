import Image from "next/image";

type LogoPartProps = {
  className?: string;
};

export function LogoSymbol({
  className = "h-12 w-12 shrink-0 lg:h-14 lg:w-14",
}: LogoPartProps) {
  return (
    <span
      className={`relative inline-flex translate-y-[3px] items-center justify-center overflow-hidden ${className}`}
    >
      <Image
        src="/logo-symbol.png"
        alt=""
        width={1024}
        height={1024}
        className="h-full w-full scale-[1.7] object-contain"
        priority
        aria-hidden
      />
    </span>
  );
}

export function LogoWordmark({ className = "" }: LogoPartProps) {
  return (
    <span
      className={`font-heading inline-flex items-baseline text-[1.65rem] leading-none lg:text-[2.1rem] ${className}`}
    >
      <span className="text-white uppercase tracking-[0.04em]">DREAM</span>
      <span className="text-accent italic">it</span>
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
