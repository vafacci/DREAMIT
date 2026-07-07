import { LogoSymbol } from "@/components/ui/Logo";

type HeroBrandHeadlineProps = {
  wordmarkRef?: React.Ref<HTMLSpanElement>;
};

export function HeroBrandHeadline({ wordmarkRef }: HeroBrandHeadlineProps) {
  return (
    <h1 className="hero-intro__logo">
      <span className="hero-intro__symbol-pulse" aria-hidden>
        <LogoSymbol className="hero-intro__symbol" />
      </span>
      <span ref={wordmarkRef} className="hero-intro__wordmark">
        DREAM<span className="hero-intro__wordmark-accent">it</span>
      </span>
    </h1>
  );
}
