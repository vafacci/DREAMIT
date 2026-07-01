export type PanelTransform = {
  opacity: number;
  rotateX: number;
  translateY: number;
  translateZ: number;
  scale: number;
  contentY: number;
  zIndex: number;
  pointerEvents: "auto" | "none";
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

/** Perlin smootherstep — zero derivative at 0 and 1 for seamless handoffs */
function smoothEase(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export function getProblemPanelTransform(
  panelIndex: number,
  progress: number,
  totalPanels: number,
  lite = false,
): PanelTransform {
  const t = progress * (totalPanels - 1);
  const distance = t - panelIndex;

  if (distance < -1 || distance > 1) {
    return {
      opacity: 0,
      rotateX: 0,
      translateY: distance < -1 ? 8 : -8,
      translateZ: 0,
      scale: 1,
      contentY: 0,
      zIndex: panelIndex,
      pointerEvents: "none",
    };
  }

  let rotateX = 0;
  let translateY = 0;
  let translateZ = 0;
  let scale = 1;
  let contentY = 0;
  let opacity = 1;

  if (distance < 0) {
    const e = smoothEase(distance + 1);
    if (lite) {
      opacity = e;
    } else {
      const lift = 1 - e;
      rotateX = lift * 7;
      translateY = lift * 14;
      translateZ = lift * -55;
      scale = 0.965 + e * 0.035;
      contentY = lift * 10;
      opacity = e;
    }
  } else {
    const e = smoothEase(distance);
    if (lite) {
      opacity = 1 - e;
    } else {
      rotateX = -e * 7;
      translateY = -e * 14;
      translateZ = -e * 55;
      scale = 1 - e * 0.035;
      contentY = -e * 10;
      opacity = 1 - e;
    }
  }

  const zIndex =
    Math.round((1 - Math.min(1, Math.abs(distance))) * 100) + panelIndex;

  return {
    opacity,
    rotateX,
    translateY,
    translateZ,
    scale,
    contentY,
    zIndex,
    pointerEvents: opacity > 0.35 ? "auto" : "none",
  };
}

export function clamp01Progress(value: number) {
  return clamp01(value);
}
