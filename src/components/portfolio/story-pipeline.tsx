"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotion } from "@/components/motion/motion-provider";
import { configureScrollTrigger, refreshScrollTrigger } from "@/lib/motion";
import { scrollToAnchor } from "@/lib/lenis-instance";

const stages = ["Hero", "About", "Experience", "Skills", "Projects", "Build", "Contact"];

export function StoryPipeline({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useMotion();

  useLayoutEffect(() => {
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);
    configureScrollTrigger();

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-story-section]");
      const indexItems = gsap.utils.toArray<HTMLElement>("[data-story-index]");

      const setStage = (activeIndex: number) => {
        sections.forEach((section, index) => {
          section.dataset.state =
            index < activeIndex ? "complete" : index === activeIndex ? "active" : "queued";
        });
        indexItems.forEach((item, index) => {
          item.dataset.state =
            index < activeIndex ? "complete" : index === activeIndex ? "active" : "queued";
        });
      };

      setStage(0);

      ScrollTrigger.batch(sections, {
        start: "top 52%",
        end: "bottom 52%",
        onEnter: (batch) => {
          const index = sections.indexOf(batch[0] as HTMLElement);
          if (index >= 0) setStage(index);
        },
        onEnterBack: (batch) => {
          const index = sections.indexOf(batch[0] as HTMLElement);
          if (index >= 0) setStage(index);
        },
      });

      if (!reducedMotion) {
        gsap.fromTo(
          "[data-pipeline-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.35,
              fastScrollEnd: true,
            },
          },
        );

        gsap.fromTo(
          "[data-pipeline-pulse]",
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.28,
              fastScrollEnd: true,
            },
          },
        );

        sections.forEach((section) => {
          const content = section.querySelectorAll("[data-story-content]");
          if (!content.length) return;

          gsap.fromTo(
            content,
            { autoAlpha: 0.4, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                end: "top 44%",
                scrub: 0.4,
                fastScrollEnd: true,
              },
            },
          );
        });
      } else {
        gsap.set("[data-story-content]", { autoAlpha: 1, y: 0 });
        gsap.set("[data-pipeline-progress]", { scaleY: 1 });
      }

      refreshScrollTrigger(0);
    }, root);

    return () => context.revert();
  }, [ready, reducedMotion]);

  return (
    <div ref={root} className="story-system">
      <div className="story-rail" aria-hidden="true">
        <span className="story-rail-base" />
        <span data-pipeline-progress className="story-rail-progress" />
        <span data-pipeline-pulse className="story-rail-pulse" />
      </div>

      <aside className="story-index" aria-label="Page progress">
        {stages.map((stage, index) => {
          const href = `#${stage === "Build" ? "build-systems" : stage.toLowerCase()}`;

          return (
          <a
            key={stage}
            data-story-index
            href={href}
            className="story-index-item"
            onClick={(event) => {
              event.preventDefault();
              scrollToAnchor(href);
            }}
          >
            <span>0{index + 1}</span>
            <span>{stage}</span>
          </a>
          );
        })}
      </aside>

      {children}
    </div>
  );
}

export function StoryNode({ index, label }: { index: string; label: string }) {
  return (
    <div className="story-node" aria-hidden="true">
      <span className="story-node-ring">
        <span className="story-node-core" />
      </span>
      <span className="story-node-label">
        {index} / {label}
      </span>
    </div>
  );
}
