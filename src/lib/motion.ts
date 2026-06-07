import { ScrollTrigger } from "gsap/ScrollTrigger";

export const BOOT_SEQUENCE = [
  "Initializing Services...",
  "Connecting APIs...",
  "Loading Architecture...",
  "System Ready",
] as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function configureScrollTrigger() {
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}

export function refreshScrollTrigger(delay = 0) {
  if (typeof window === "undefined") return;

  const run = () => ScrollTrigger.refresh();

  if (delay > 0) {
    window.setTimeout(run, delay);
  } else {
    run();
  }
}
