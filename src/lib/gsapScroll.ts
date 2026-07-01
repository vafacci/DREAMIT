import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let configured = false;

export function ensureGsapScroll() {
  if (configured) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true });
  configured = true;
}
