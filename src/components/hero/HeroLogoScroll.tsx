import Image from "next/image";

export const HERO_LOGO_SRC = "/hero/logo-swoosh.png";

type HeroLogoScrollProps = {
  progress: number;
};

export function HeroLogoScroll({ progress }: HeroLogoScrollProps) {
  const scale = 0.7 + progress * 0.95;
  const imageOpacity = 0.5 + progress * 0.5;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black">
      <Image
        src={HERO_LOGO_SRC}
        alt=""
        width={1024}
        height={1024}
        priority
        quality={100}
        sizes="(max-width: 768px) 90vw, 480px"
        className="h-auto w-[min(88vw,480px)] max-w-none select-none"
        style={{
          transform: `scale(${scale})`,
          opacity: imageOpacity,
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
