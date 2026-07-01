import { PROBLEM_STEPS } from "@/lib/problemContent";

/** Intro-panel + ét step per problem */
export const PROBLEM_PANEL_COUNT = 1 + PROBLEM_STEPS.length;

/** Scroll-højde: ~145vh per overgang — mere plads til bløde panel-skift */
export const PROBLEM_SCROLL_HEIGHT_VH = (PROBLEM_PANEL_COUNT - 1) * 145 + 50;
export const PROBLEM_SCROLL_HEIGHT = `${PROBLEM_SCROLL_HEIGHT_VH}vh`;

/** Højere scrub = silket scroll-følge mellem paneler */
export const PROBLEM_SCROLL_SCRUB = 0.95;
