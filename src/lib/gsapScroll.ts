import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let configured = false;

export function ensureGsapScroll() {
  if (configured) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
  configured = true;
}

/** Refresh ScrollTrigger without mobile address-bar resize storms. */
export function bindScrollTriggerRefresh(
  refresh: () => void,
  mobile: boolean,
) {
  window.addEventListener("load", refresh);

  if (mobile) {
    window.addEventListener("orientationchange", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refresh, 200);
  };

  window.addEventListener("resize", onResize);
  return () => {
    clearTimeout(resizeTimer);
    window.removeEventListener("load", refresh);
    window.removeEventListener("resize", onResize);
  };
}
