"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { BOOT_SEQUENCE } from "@/lib/motion";
import { useMotion } from "@/components/motion/motion-provider";

export function BootSequence() {
  const { setReady } = useMotion();
  const root = useRef<HTMLDivElement>(null);
  const [activeLine, setActiveLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.classList.add("is-booting");
    document.body.setAttribute("aria-busy", "true");

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.to(root.current, {
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete: () => {
              document.body.classList.remove("is-booting");
              document.body.removeAttribute("aria-busy");
              setReady(true);
            },
          });
        },
      });

      BOOT_SEQUENCE.forEach((line, index) => {
        timeline.call(() => {
          setActiveLine(index);
          setProgress(((index + 1) / BOOT_SEQUENCE.length) * 100);
        });

        timeline.to(
          `[data-boot-line="${index}"]`,
          { autoAlpha: 1, x: 0, duration: 0.28 },
          index === 0 ? 0.2 : "+=0.3",
        );

        if (index < BOOT_SEQUENCE.length - 1) {
          timeline.to(`[data-boot-line="${index}"]`, { color: "var(--muted)", duration: 0.16 }, "+=0.12");
        } else {
          timeline.to(`[data-boot-line="${index}"]`, { color: "var(--success)", duration: 0.2 }, "+=0.1");
        }
      });

      timeline.to("[data-boot-progress]", { scaleX: 1, duration: 1.35, ease: "none" }, 0.15);
    }, root);

    return () => {
      context.revert();
      document.body.classList.remove("is-booting");
      document.body.removeAttribute("aria-busy");
    };
  }, [setReady]);

  return (
    <div ref={root} className="boot-sequence" role="status" aria-live="polite" aria-label="System boot sequence">
      <div className="boot-sequence-panel">
        <div className="boot-sequence-top">
          <span>GP / runtime</span>
          <span>v1.0.0</span>
        </div>

        <div className="boot-sequence-body">
          {BOOT_SEQUENCE.map((line, index) => (
            <p
              key={line}
              data-boot-line={index}
              className="boot-sequence-line"
              data-active={index === activeLine}
            >
              <span className="boot-sequence-marker" aria-hidden="true" />
              {line}
            </p>
          ))}
        </div>

        <div className="boot-sequence-progress" aria-hidden="true">
          <span data-boot-progress className="boot-sequence-progress-bar" />
        </div>

        <p className="boot-sequence-status">
          Boot progress / {progress.toFixed(0)}%
        </p>
      </div>
    </div>
  );
}
