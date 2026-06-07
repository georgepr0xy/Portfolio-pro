import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function scrollToAnchor(target: string) {
  const element = document.querySelector<HTMLElement>(target);
  if (!element) return;

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(element, { offset: -72, duration: 1.1 });
    return;
  }

  element.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
