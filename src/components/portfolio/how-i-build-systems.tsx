"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotion } from "@/components/motion/motion-provider";
import { StoryNode } from "@/components/portfolio/story-pipeline";
import { useScrollRefresh } from "@/hooks/use-scroll-refresh";
import { configureScrollTrigger, refreshScrollTrigger } from "@/lib/motion";
import { buildSystemStages } from "@/lib/data";

const SPINE_X = 300;
const SPINE_PATH = "M300 72 V572";

export function HowIBuildSystems() {
  const root = useRef<HTMLDivElement>(null);
  const scrollTrack = useRef<HTMLDivElement>(null);
  const pinPanel = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useMotion();
  useScrollRefresh();
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStage = buildSystemStages[activeIndex];
  const evolution = progress;

  useLayoutEffect(() => {
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);
    configureScrollTrigger();

    const context = gsap.context(() => {
      const reduceMotion = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        setProgress(1);
        setActiveIndex(buildSystemStages.length - 1);
        return;
      }

      ScrollTrigger.create({
        trigger: scrollTrack.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const value = self.progress;
          setProgress(value);
          const index = Math.min(
            buildSystemStages.length - 1,
            Math.floor(value * buildSystemStages.length),
          );
          setActiveIndex(index);
        },
      });
      refreshScrollTrigger(0);
    }, root);

    return () => context.revert();
  }, [ready, reducedMotion]);

  return (
    <div ref={root} className="build-documentary">
      <div ref={scrollTrack} className="build-documentary-track">
        <div ref={pinPanel} className="build-documentary-pin">
          <div className="build-documentary-rail-node" aria-hidden="true">
            <StoryNode index="06" label="Build" />
          </div>

          <div className="build-documentary-vignette" aria-hidden="true" />
          <div className="build-documentary-grain" aria-hidden="true" />

          <header className="build-documentary-header">
            <div>
              <p className="build-documentary-kicker">Documentary / How I build systems</p>
              <h2 className="build-documentary-title">
                From sketch
                <br />
                to production.
              </h2>
            </div>
            <div className="build-documentary-telemetry">
              <span>FRAME {String(activeIndex + 1).padStart(2, "0")}</span>
              <span>EVOLUTION {(evolution * 100).toFixed(0)}%</span>
              <span className="text-[var(--success)]">RECORDING</span>
            </div>
          </header>

          <div className="build-documentary-stage">
            <aside className="build-documentary-chapters" aria-label="Build stages">
              {buildSystemStages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="build-documentary-chapter"
                  data-active={index === activeIndex}
                  data-complete={index < activeIndex}
                >
                  <span>{stage.chapter}</span>
                  <span>{stage.label}</span>
                </div>
              ))}
            </aside>

            <div className="build-documentary-canvas">
              <div
                className="build-documentary-grid"
                style={{ opacity: 0.15 + evolution * 0.55 }}
                aria-hidden="true"
              />

              <svg
                viewBox="0 0 600 640"
                className="build-documentary-svg"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <filter id="build-sketch-warp">
                    <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.5 + (1 - evolution) * 3} />
                  </filter>
                </defs>

                <g
                  className="build-documentary-sketch-layer"
                  style={{ opacity: 1 - evolution * 0.92 }}
                  filter={evolution < 0.65 ? "url(#build-sketch-warp)" : undefined}
                >
                  <path
                    d={SPINE_PATH}
                    fill="none"
                    stroke="var(--muted-light)"
                    strokeWidth="1"
                    strokeDasharray="6 8"
                  />
                  {buildSystemStages.map((stage) => (
                    <g key={`sketch-${stage.id}`}>
                      <rect
                        x={SPINE_X - 90}
                        y={stage.y - 22}
                        width="180"
                        height="44"
                        fill="none"
                        stroke="var(--muted-light)"
                        strokeWidth="1"
                        strokeDasharray="4 6"
                        rx="2"
                      />
                      <text
                        x={SPINE_X}
                        y={stage.y + 4}
                        textAnchor="middle"
                        className="build-documentary-sketch-label"
                      >
                        {stage.label}
                      </text>
                    </g>
                  ))}
                </g>

                <g className="build-documentary-prod-layer" style={{ opacity: evolution }}>
                  <path d={SPINE_PATH} fill="none" stroke="var(--line-strong)" strokeWidth="1.25" />

                  <path
                    d={SPINE_PATH}
                    fill="none"
                    stroke="var(--navy)"
                    strokeWidth="1.5"
                    strokeDasharray="3 14"
                    strokeLinecap="round"
                    className="build-documentary-spine-flow"
                  />

                  {buildSystemStages.slice(0, -1).map((stage, index) => {
                    const next = buildSystemStages[index + 1];
                    return (
                      <path
                        key={`connector-${stage.id}`}
                        d={`M${SPINE_X} ${stage.y + 28} V${next.y - 28}`}
                        fill="none"
                        stroke="var(--navy)"
                        strokeWidth="1"
                        strokeOpacity={0.25 + evolution * 0.45}
                      />
                    );
                  })}

                  {[0, 1, 2, 3].map((packet) => (
                    <circle
                      key={packet}
                      r={packet === 0 ? 3 : 2.5}
                      className="build-documentary-packet"
                      style={{ animationDelay: `${packet * -1.4}s` }}
                    />
                  ))}
                </g>
              </svg>

              {buildSystemStages.map((stage, index) => {
                const nodeProgress = Math.min(
                  1,
                  Math.max(0, (evolution - index / buildSystemStages.length) * buildSystemStages.length),
                );

                return (
                  <div
                    key={stage.id}
                    className="build-documentary-node"
                    style={{ top: `${((stage.y - 10) / 640) * 100}%` }}
                    data-active={index === activeIndex}
                    data-complete={index < activeIndex}
                  >
                    <div
                      className="build-documentary-node-sketch"
                      style={{ opacity: 1 - nodeProgress * 0.95 }}
                    >
                      <span>{stage.sketchMeta}</span>
                    </div>
                    <div
                      className="build-documentary-node-prod"
                      style={{ opacity: nodeProgress }}
                    >
                      <div className="build-documentary-node-head">
                        <span className="build-documentary-node-signal" />
                        <strong>{stage.label}</strong>
                        <span>{stage.productionMeta}</span>
                      </div>
                      <div className="build-documentary-node-services">
                        {stage.services.map((service) => (
                          <span key={service}>{service}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="build-documentary-narration">
              <p className="build-documentary-narration-kicker">
                {activeStage.chapter} / {activeStage.label}
              </p>
              <p className="build-documentary-narration-text">{activeStage.narration}</p>
              <div className="build-documentary-log">
                <span>System log</span>
                <code>{activeStage.log}</code>
              </div>
            </aside>
          </div>

          <footer className="build-documentary-footer">
            <span>Phase / {activeStage.label.toLowerCase()}</span>
            <span>
              Infrastructure fidelity / {(20 + evolution * 80).toFixed(0)}%
            </span>
            <span>Packets in transit / continuous</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
