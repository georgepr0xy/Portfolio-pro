"use client";

import { useState } from "react";

import { useScrollRefresh } from "@/hooks/use-scroll-refresh";

const domains = [
  {
    id: "ai",
    label: "AI",
    specialization: "AI Applications / RAG Systems",
    description:
      "Building applied AI workflows that connect retrieval, context, models, and product interfaces into reliable user experiences.",
    position: "left-1/2 top-[4%] -translate-x-1/2",
  },
  {
    id: "backend",
    label: "Backend",
    specialization: "Backend Engineering",
    description:
      "Designing scalable APIs, services, event-driven workflows, data contracts, and the operational foundations that keep product systems dependable.",
    position: "right-[2%] top-[29%]",
  },
  {
    id: "cloud",
    label: "Cloud",
    specialization: "Distributed Infrastructure",
    description:
      "Connecting applications to deployable, observable infrastructure with clear boundaries between runtime responsibilities.",
    position: "right-[10%] bottom-[5%]",
  },
  {
    id: "analytics",
    label: "Analytics",
    specialization: "Analytics Platforms",
    description:
      "Creating data flows and analytics surfaces that transform system activity into useful product and operational signals.",
    position: "left-[10%] bottom-[5%]",
  },
  {
    id: "frontend",
    label: "Frontend",
    specialization: "Modern Web Experiences",
    description:
      "Building precise interfaces that make complex system state understandable, responsive, and useful to real users.",
    position: "left-[2%] top-[29%]",
  },
];

export function AboutSystemMap() {
  useScrollRefresh();
  const [activeId, setActiveId] = useState("ai");
  const activeDomain = domains.find((domain) => domain.id === activeId) ?? domains[0];

  return (
    <div className="about-map">
      <div className="about-map-topline">
        <span>Capability graph / 5 connected domains</span>
        <span className="text-[var(--success)]">ONLINE</span>
      </div>

      <div className="about-map-canvas">
        <svg viewBox="0 0 500 500" className="about-map-lines" aria-hidden="true">
          <g fill="none" stroke="var(--line-strong)" strokeWidth="1">
            <path d="M250 250 L250 62" />
            <path d="M250 250 L416 177" />
            <path d="M250 250 L358 426" />
            <path d="M250 250 L142 426" />
            <path d="M250 250 L84 177" />
          </g>
          <g
            fill="none"
            stroke="var(--navy)"
            strokeWidth="1.5"
            strokeDasharray="2 13"
            strokeLinecap="round"
          >
            <path className="about-flow-line" d="M250 250 L250 62" />
            <path className="about-flow-line about-flow-line-delayed" d="M250 250 L416 177" />
            <path className="about-flow-line" d="M250 250 L358 426" />
            <path className="about-flow-line about-flow-line-delayed" d="M250 250 L142 426" />
            <path className="about-flow-line" d="M250 250 L84 177" />
          </g>
        </svg>

        <div className="about-map-center">
          <span className="about-map-center-status" />
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">
            Core node
          </span>
          <strong>George Province</strong>
          <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/45">
            Software Developer-1
          </span>
        </div>

        {domains.map((domain) => (
          <button
            key={domain.id}
            type="button"
            className={`about-domain-node ${domain.position}`}
            data-active={activeId === domain.id}
            onMouseEnter={() => setActiveId(domain.id)}
            onFocus={() => setActiveId(domain.id)}
            onClick={() => setActiveId(domain.id)}
            aria-pressed={activeId === domain.id}
          >
            <span className="about-domain-signal" />
            <span>{domain.label}</span>
          </button>
        ))}
      </div>

      <div className="about-map-detail" aria-live="polite">
        <div>
          <span className="story-kicker">{activeDomain.label} / Active domain</span>
          <h3>{activeDomain.specialization}</h3>
        </div>
        <p>{activeDomain.description}</p>
      </div>
    </div>
  );
}
