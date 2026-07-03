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
  exitProgress: number;
  stageRotateX: number;
  stageRotateY: number;
  stageTranslateY: number;
  stageTranslateZ: number;
  stageScale: number;
  stageOpacity: number;
  logoScale: number;
  exitGlowOpacity: number;
};

export function getHeroTimeline(progress: number, mobile = false): HeroTimeline {
  const raw = clamp01(progress);

  const introFade = mapRange(raw, 0.16, 0.42);
  const introOpacity = clamp01(1 - easeInOutCubic(introFade));
  const introY = easeInOutCubic(introFade) * -28;

  const cameraProgress = easeInOutCubic(mapRange(raw, 0.12, 0.66));
  const exitProgress = easeInOutCubic(mapRange(raw, 0.66, 1));

  const accentGlowOpacity = clamp01(
    1 - easeInOutCubic(mapRange(raw, 0.48, 0.72)) * 0.4,
  );

  const scrollHintOpacity = clamp01(1 - raw / 0.16);

  const logoSceneOpacity =
    exitProgress > 0
      ? clamp01(1 - easeInOutCubic(mapRange(raw, 0.66, 0.9)))
      : 1;

  const logoScaleBase = mobile ? 0.9 : 0.88;
  const logoScaleZoom = mobile ? 0.08 : 0.12;
  const logoScaleExit = exitProgress * (mobile ? 0.12 : 0.18);
  const logoScale = logoScaleBase + cameraProgress * logoScaleZoom - logoScaleExit;

  const stageRotateX = exitProgress * (mobile ? 36 : 74);
  const stageRotateY = exitProgress * (mobile ? 5 : 11);
  const stageTranslateY = -exitProgress * (mobile ? 32 : 58);
  const stageTranslateZ = -exitProgress * (mobile ? 100 : 280);
  const stageScale = 1 - exitProgress * (mobile ? 0.06 : 0.12);
  const stageOpacity = 1 - exitProgress * (mobile ? 0.3 : 0.5);
  const exitGlowOpacity = clamp01(Math.sin(exitProgress * Math.PI) * 0.85);

  return {
    raw,
    introOpacity,
    introY,
    accentGlowOpacity,
    logoSceneOpacity,
    cameraProgress,
    scrollHintOpacity,
    exitProgress,
    stageRotateX,
    stageRotateY,
    stageTranslateY,
    stageTranslateZ,
    stageScale,
    stageOpacity,
    logoScale,
    exitGlowOpacity,
  };
}
