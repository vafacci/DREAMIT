import type { gsap as GsapNamespace } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export type GsapRuntime = {
  gsap: typeof GsapNamespace;
  ScrollTrigger: typeof ScrollTriggerPlugin;
};

let runtime: GsapRuntime | null = null;
let loading: Promise<GsapRuntime> | null = null;

/** Lazy-load GSAP + ScrollTrigger on first scroll experience mount. */
export function loadGsapScroll(): Promise<GsapRuntime> {
  if (runtime) return Promise.resolve(runtime);
  if (loading) return loading;

  loading = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });
      runtime = { gsap, ScrollTrigger };
      return runtime;
    },
  );

  return loading;
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
