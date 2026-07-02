function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function mapRange(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

export type HeroTimeline = {
  raw: number;
  introOpacity: number;
  introY: number;
  accentGlowOpacity: number;
  logoSceneOpacity: number;
  cameraProgress: number;
  scrollHintOpacity: number;
};

export function getHeroTimeline(progress: number): HeroTimeline {
  const raw = clamp01(progress);

  const introFade = mapRange(raw, 0.16, 0.42);
  const introOpacity = clamp01(1 - easeInOutCubic(introFade));
  const introY = easeInOutCubic(introFade) * -28;

  const cameraProgress = easeInOutCubic(mapRange(raw, 0.12, 0.9));

  const accentGlowOpacity = clamp01(
    1 - easeInOutCubic(mapRange(raw, 0.5, 0.88)) * 0.4,
  );

  const logoSceneOpacity = clamp01(1 - easeInOutCubic(mapRange(raw, 0.82, 0.94)));

  const scrollHintOpacity = clamp01(1 - raw / 0.16);

  return {
    raw,
    introOpacity,
    introY,
    accentGlowOpacity,
    logoSceneOpacity,
    cameraProgress,
    scrollHintOpacity,
  };
}
