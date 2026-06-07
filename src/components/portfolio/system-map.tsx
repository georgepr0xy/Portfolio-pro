"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotion } from "@/components/motion/motion-provider";

const layers = [
  {
    id: "user",
    label: "User",
    meta: "CLIENT / HTTPS",
    className: "left-1/2 top-[5%] w-[46%] -translate-x-1/2",
  },
  {
    id: "gateway",
    label: "API Gateway",
    meta: "AUTH / RATE LIMIT / ROUTING",
    className: "left-1/2 top-[20%] w-[62%] -translate-x-1/2",
  },
  {
    id: "services",
    label: "Services",
    meta: "DISTRIBUTED COMPUTE",
    className: "left-1/2 top-[36%] w-[82%] -translate-x-1/2",
    services: ["AI", "CORE", "JOBS"],
  },
  {
    id: "stream",
    label: "Kafka / Event Stream",
    meta: "TOPICS 12 / PARTITIONS 48",
    className: "left-1/2 top-[54%] w-[72%] -translate-x-1/2",
  },
  {
    id: "database",
    label: "Database Layer",
    meta: "PRIMARY / REPLICA / CACHE",
    className: "left-1/2 top-[70%] w-[76%] -translate-x-1/2",
  },
  {
    id: "analytics",
    label: "Analytics Layer",
    meta: "STREAM PROCESSING / BI",
    className: "left-1/2 top-[86%] w-[62%] -translate-x-1/2",
  },
];

export function SystemMap() {
  const root = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useMotion();

  useLayoutEffect(() => {
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set("[data-architecture-node], [data-connector], [data-particle]", {
          opacity: 1,
        });
        return;
      }

      gsap.set("[data-architecture-node]", { autoAlpha: 0, y: 14 });
      gsap.set("[data-connector]", { strokeDashoffset: 1 });

      const build = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 18%",
          end: "bottom 30%",
          scrub: 0.65,
        },
      });

      layers.forEach((layer, index) => {
        build.to(
          `[data-layer="${layer.id}"]`,
          { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
          index * 0.48,
        );

        if (index < layers.length - 1) {
          build.to(
            `[data-connector="${index}"]`,
            { strokeDashoffset: 0, duration: 0.4, ease: "none" },
            index * 0.48 + 0.28,
          );
        }
      });

      gsap.utils.toArray<SVGCircleElement>("[data-particle]").forEach((particle, index) => {
        gsap.fromTo(
          particle,
          { attr: { cy: 30 }, autoAlpha: 0 },
          {
            attr: { cy: 670 },
            autoAlpha: 1,
            duration: 3.2 + index * 0.18,
            delay: index * 0.7,
            repeat: -1,
            ease: "none",
          },
        );
      });

      gsap.to("[data-activity]", {
        opacity: 0.3,
        duration: 0.8,
        stagger: { each: 0.16, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    }, root);

    return () => context.revert();
  }, [ready, reducedMotion]);

  return (
    <div
      ref={root}
      className="architecture-panel relative min-h-[690px] overflow-hidden border-l border-[var(--line)] max-lg:border-l-0 max-lg:border-t"
    >
      <div className="absolute inset-0 architecture-grid opacity-45" />

      <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--muted)]">
        <span>Live topology / prod-eu-1</span>
        <span className="flex items-center gap-2 text-[var(--success)]">
          <span className="status-dot" />
          6 layers healthy
        </span>
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 480 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g fill="none" stroke="var(--line-strong)" strokeWidth="1.25">
          {[0, 1, 2, 3, 4].map((index) => (
            <path
              key={index}
              data-connector={index}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              d={`M240 ${92 + index * 115} V${132 + index * 115}`}
            />
          ))}
          <path
            data-connector="1"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            d="M240 247 V260 M240 260 H120 V276 M240 260 V276 M240 260 H360 V276"
          />
        </g>

        <line x1="240" y1="30" x2="240" y2="670" stroke="var(--navy)" strokeOpacity="0.08" />
        {[0, 1, 2].map((particle) => (
          <circle
            key={particle}
            data-particle
            cx={240}
            cy={30}
            r={particle === 1 ? 2.5 : 2}
            fill="var(--navy)"
            opacity="0"
          />
        ))}
      </svg>

      {layers.map((layer) => (
        <div
          key={layer.id}
          data-architecture-node
          data-layer={layer.id}
          className={`architecture-node absolute z-10 ${layer.className}`}
        >
          <div className="flex items-center justify-between gap-4 px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span data-activity className="size-1.5 shrink-0 rounded-full bg-[var(--navy)]" />
              <span className="truncate text-xs font-medium">{layer.label}</span>
            </div>
            <span className="hidden truncate font-mono text-[7px] uppercase tracking-[0.1em] text-[var(--muted)] sm:block">
              {layer.meta}
            </span>
          </div>
          {layer.services && (
            <div className="grid grid-cols-3 border-t border-[var(--line)]">
              {layer.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center justify-center gap-2 py-2 font-mono text-[8px] tracking-[0.12em] text-[var(--muted)] [&:not(:last-child)]:border-r [&:not(:last-child)]:border-[var(--line)]"
                >
                  <span className="size-1 rounded-full bg-[var(--success)]" />
                  {service}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 border-t border-[var(--line)] pt-3 font-mono text-[7px] uppercase tracking-[0.11em] text-[var(--muted)]">
        <span>Latency 42ms</span>
        <span className="text-center">Throughput 8.4k/s</span>
        <span className="text-right">Errors 0.02%</span>
      </div>
    </div>
  );
}
