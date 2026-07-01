"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type CarouselImage = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  className?: string;
  theme?: "dark" | "paper";
};

export function ImageCarousel({
  images,
  className = "",
  theme = "dark",
}: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const slide = container.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(index);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const slideWidth = container.offsetWidth;
      if (!slideWidth) return;
      const index = Math.round(container.scrollLeft / slideWidth);
      setActive(index);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  if (images.length === 0) return null;

  const inactiveDot =
    theme === "paper" ? "w-4 bg-black/20" : "w-4 bg-white/25";

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label="Billedegalleri"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className="relative aspect-[4/5] min-w-full shrink-0 snap-center sm:aspect-[16/10]"
            aria-roledescription="slide"
            aria-label={`${index + 1} af ${images.length}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-[2px] transition-all duration-300 ${
                index === active ? "w-8 bg-brand" : inactiveDot
              }`}
              aria-label={`Gå til billede ${index + 1}`}
              aria-current={index === active}
            />
          ))}
        </div>
      )}
    </div>
  );
}
