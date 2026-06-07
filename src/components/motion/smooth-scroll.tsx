"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { configureScrollTrigger, refreshScrollTrigger } from "@/lib/motion";
import { setLenisInstance } from "@/lib/lenis-instance";
import { useMotion } from "@/components/motion/motion-provider";

export function SmoothScroll({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (!enabled || reducedMotion) {
      setLenisInstance(null);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    configureScrollTrigger();

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
      wheelMultiplier: 0.95,
      infinite: false,
    });

    setLenisInstance(lenis);
    document.body.classList.add("has-lenis");
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => refreshScrollTrigger(120);
    window.addEventListener("resize", onResize, { passive: true });

    const onScrollRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onScrollRefresh);
    refreshScrollTrigger(0);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", onScrollRefresh);
      gsap.ticker.remove(update);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      document.body.classList.remove("has-lenis");
      setLenisInstance(null);
      lenis.destroy();
    };
  }, [enabled, reducedMotion]);

  return children;
}
