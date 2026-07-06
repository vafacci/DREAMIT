function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

export function getCasesScrollHeight(slideCount: number, mobile: boolean) {
  const perSlide = mobile ? 55 : 70;
  const base = mobile ? 100 : 115;
  return `calc(${base + Math.max(0, slideCount - 1) * perSlide}vh)`;
}

export function getCasesRingRotation(progress: number, slideCount: number) {
  if (slideCount <= 1) return 0;
  const step = 360 / slideCount;
  return -progress * step * (slideCount - 1);
}

export function getActiveSlideIndex(progress: number, slideCount: number) {
  if (slideCount <= 1) return 0;
  return Math.round(clamp01(progress) * (slideCount - 1));
}

export type CasePanelVisual = {
  opacity: number;
  scale: number;
  zIndex: number;
  blur: number;
  brightness: number;
};

export function getCasePanelVisual(
  panelIndex: number,
  ringRotation: number,
  slideCount: number,
): CasePanelVisual {
  const step = 360 / slideCount;
  const worldAngle = normalizeAngle(panelIndex * step + ringRotation);
  const distance = Math.min(worldAngle, 360 - worldAngle);
  const t = clamp01(distance / step);

  return {
    opacity: 0.22 + (1 - t) * 0.78,
    scale: 0.64 + (1 - t) * 0.36,
    zIndex: Math.round((1 - t) * 100),
    blur: t * 2,
    brightness: 0.5 + (1 - t) * 0.5,
  };
}
