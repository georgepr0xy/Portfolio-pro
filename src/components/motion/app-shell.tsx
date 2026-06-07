"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";

import { BootSequence } from "@/components/motion/boot-sequence";
import { MotionProvider, useMotion } from "@/components/motion/motion-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { prefersReducedMotion } from "@/lib/motion";

function PortfolioReveal({ children }: { children: ReactNode }) {
  const { ready } = useMotion();
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || !content.current) return;

    if (prefersReducedMotion()) {
      gsap.set(content.current, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      content.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", delay: 0.05 },
    );
  }, [ready]);

  return (
    <div ref={content} className={`app-reveal${ready ? " is-ready" : ""}`}>
      {children}
    </div>
  );
}

function AppShellInner({ children }: { children: ReactNode }) {
  const { ready, reducedMotion } = useMotion();

  return (
    <>
      {!ready && !reducedMotion && <BootSequence />}
      <PortfolioReveal>
        <SmoothScroll enabled={ready}>{children}</SmoothScroll>
      </PortfolioReveal>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useLayoutEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  return (
    <MotionProvider reducedMotion={reducedMotion}>
      <AppShellInner>{children}</AppShellInner>
    </MotionProvider>
  );
}
