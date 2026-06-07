"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

import type { ProjectCaseStudy } from "@/lib/data";

export function ProjectArchitecture({
  architecture,
  projectId,
  active,
}: {
  architecture: ProjectCaseStudy["architecture"];
  projectId: string;
  active: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active || !root.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const scope = `[data-project-arch="${projectId}"]`;

      if (reduceMotion) {
        gsap.set(`${scope} [data-arch-node]`, { autoAlpha: 1, y: 0 });
        gsap.set(`${scope} [data-arch-connector]`, { strokeDashoffset: 0 });
        return;
      }

      gsap.set(`${scope} [data-arch-node]`, { autoAlpha: 0, y: 10 });
      gsap.set(`${scope} [data-arch-connector]`, { strokeDashoffset: 1 });

      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

      architecture.layers.forEach((layer, index) => {
        timeline.to(
          `${scope} [data-arch-node="${layer.id}"]`,
          { autoAlpha: 1, y: 0, duration: 0.35 },
          index * 0.12,
        );

        if (index < architecture.connectors.length) {
          timeline.to(
            `${scope} [data-arch-connector="${index}"]`,
            { strokeDashoffset: 0, duration: 0.28, ease: "none" },
            index * 0.12 + 0.08,
          );
        }
      });
    }, root);

    return () => context.revert();
  }, [active, architecture, projectId]);

  return (
    <div
      ref={root}
      data-project-arch={projectId}
      data-active={active}
      className="project-architecture"
      aria-hidden={!active}
    >
      <div className="project-architecture-topline">
        <span>{architecture.caption}</span>
        <span className="text-[var(--success)]">{architecture.status}</span>
      </div>

      <div className="project-architecture-canvas">
        <div className="project-architecture-grid" />

        <svg
          viewBox="0 0 400 500"
          className="project-architecture-lines"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <g fill="none" stroke="var(--line-strong)" strokeWidth="1">
            {architecture.connectors.map((connector) => (
              <path key={connector} d={connector} />
            ))}
          </g>

          <g fill="none" strokeWidth="1.25" strokeLinecap="round">
            {architecture.connectors.map((connector, index) => (
              <path
                key={`flow-${connector}`}
                data-arch-connector={index}
                d={connector}
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                className="project-architecture-connector"
              />
            ))}
          </g>

          {architecture.flows.map((flow) => (
            <circle
              key={flow.id}
              r="2.5"
              className="project-architecture-packet"
              style={
                {
                  offsetPath: `path("${flow.path}")`,
                  animationDelay: flow.delay,
                } as CSSProperties
              }
            />
          ))}
        </svg>

        {architecture.layers.map((layer) => (
          <div
            key={layer.id}
            data-arch-node={layer.id}
            className={`architecture-node project-architecture-node absolute ${layer.className}`}
          >
            <div className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="project-architecture-signal" />
                <span className="truncate text-[10px] font-medium">{layer.label}</span>
              </div>
              <span className="hidden truncate font-mono text-[6px] uppercase tracking-[0.1em] text-[var(--muted)] sm:block">
                {layer.meta}
              </span>
            </div>
            {layer.services && (
              <div className="grid border-t border-[var(--line)]" style={{ gridTemplateColumns: `repeat(${layer.services.length}, 1fr)` }}>
                {layer.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center justify-center gap-1.5 py-1.5 font-mono text-[6px] tracking-[0.1em] text-[var(--muted)] [&:not(:last-child)]:border-r [&:not(:last-child)]:border-[var(--line)]"
                  >
                    <span className="size-0.5 rounded-full bg-[var(--success)]" />
                    {service}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
