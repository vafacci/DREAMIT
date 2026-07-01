import { PROBLEM_STEPS } from "@/lib/problemContent";

/** Intro-panel + ét step per problem */
export const PROBLEM_PANEL_COUNT = 1 + PROBLEM_STEPS.length;

const PANEL_GAP_DESKTOP_VH = 145;
const PANEL_GAP_MOBILE_VH = 105;

export function getProblemScrollHeight(mobile = false) {
  const gap = mobile ? PANEL_GAP_MOBILE_VH : PANEL_GAP_DESKTOP_VH;
  return `${(PROBLEM_PANEL_COUNT - 1) * gap + 50}vh`;
}

/** Desktop — blød scroll-følge */
export const PROBLEM_SCROLL_SCRUB_DESKTOP = 0.95;

/** Mobil — lavere scrub = mindre input-lag */
export const PROBLEM_SCROLL_SCRUB_MOBILE = 0.35;

export function getProblemScrollScrub(mobile = false) {
  return mobile ? PROBLEM_SCROLL_SCRUB_MOBILE : PROBLEM_SCROLL_SCRUB_DESKTOP;
}

/** @deprecated Brug getProblemScrollHeight() */
export const PROBLEM_SCROLL_HEIGHT_VH =
  (PROBLEM_PANEL_COUNT - 1) * PANEL_GAP_DESKTOP_VH + 50;
export const PROBLEM_SCROLL_HEIGHT = `${PROBLEM_SCROLL_HEIGHT_VH}vh`;
export const PROBLEM_SCROLL_SCRUB = PROBLEM_SCROLL_SCRUB_DESKTOP;
