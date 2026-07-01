export const HERO_SCROLL_HEIGHT_VH_DESKTOP = 220;
export const HERO_SCROLL_HEIGHT_VH_MOBILE = 150;

export function getHeroScrollHeight(mobile = false) {
  const vh = mobile ? HERO_SCROLL_HEIGHT_VH_MOBILE : HERO_SCROLL_HEIGHT_VH_DESKTOP;
  return `${vh}vh`;
}

export const HERO_SCROLL_HEIGHT_VH = HERO_SCROLL_HEIGHT_VH_DESKTOP;
export const HERO_SCROLL_HEIGHT = `${HERO_SCROLL_HEIGHT_VH}vh`;

/** true = 1:1 med scroll — mest app-lignende på mobil */
export const HERO_SCROLL_SCRUB_DESKTOP = 0.3;
export const HERO_SCROLL_SCRUB_MOBILE = true;

export function getHeroScrollScrub(mobile = false): number | boolean {
  return mobile ? HERO_SCROLL_SCRUB_MOBILE : HERO_SCROLL_SCRUB_DESKTOP;
}

export const HERO_SCROLL_SCRUB = HERO_SCROLL_SCRUB_DESKTOP;
