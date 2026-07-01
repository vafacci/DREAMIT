import Image from "next/image";
import logoSymbol from "@/assets/logo-symbol.webp";

type HeroLogoScrollProps = {
  progress: number;
};

export function HeroLogoScroll({ progress }: HeroLogoScrollProps) {
  const scale = 0.7 + progress * 0.95;
  const imageOpacity = 0.5 + progress * 0.5;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black">
      <Image
        src={logoSymbol}
        alt=""
        priority
        sizes="(max-width: 768px) 70vw, 480px"
        className="h-auto w-[min(70vw,480px)] max-w-none select-none"
        style={{
          transform: `scale(${scale})`,
          opacity: imageOpacity,
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
