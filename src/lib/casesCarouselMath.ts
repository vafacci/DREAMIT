function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

export function getCasesProgressForIndex(index: number, slideCount: number) {
  if (slideCount <= 1) return 0;
  const maxIndex = slideCount - 1;
  const target = Math.max(0, Math.min(index, maxIndex));
  return target / maxIndex;
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
    opacity: 0.18 + (1 - t) * 0.74,
    scale: 0.48 + (1 - t) * 0.3,
    zIndex: Math.round((1 - t) * 100),
    blur: 0,
    brightness: 1,
  };
}
