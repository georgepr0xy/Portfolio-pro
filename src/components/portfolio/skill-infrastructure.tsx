"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotion } from "@/components/motion/motion-provider";
import { useScrollRefresh } from "@/hooks/use-scroll-refresh";
import { skillCategories } from "@/lib/data";

type ActiveTarget =
  | { type: "category"; id: string }
  | { type: "skill"; categoryId: string; skillId: string };

export function SkillInfrastructure() {
  const root = useRef<HTMLDivElement>(null);
  const { ready } = useMotion();
  useScrollRefresh();
  const [active, setActive] = useState<ActiveTarget>({ type: "category", id: "backend" });

  const activeCategoryId =
    active.type === "category" ? active.id : active.categoryId;
  const activeCategory =
    skillCategories.find((category) => category.id === activeCategoryId) ??
    skillCategories[0];
  const activeSkill =
    active.type === "skill"
      ? activeCategory.skills.find((skill) => skill.id === active.skillId)
      : null;

  useLayoutEffect(() => {
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        "[data-skill-branch]",
        { autoAlpha: 0, scale: 0.88 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, root);

    return () => context.revert();
  }, [ready]);

  const isCategoryActive = (categoryId: string) => activeCategoryId === categoryId;
  const isSkillActive = (categoryId: string, skillId: string) =>
    active.type === "skill" &&
    active.categoryId === categoryId &&
    active.skillId === skillId;
  const isBranchActive = (categoryId: string) => activeCategoryId === categoryId;

  return (
    <div ref={root} className="skill-network">
      <div className="skill-network-header">
        <span>Infrastructure graph / engineering dependencies</span>
        <span className="text-[var(--success)]">HEALTHY</span>
      </div>

      <div className="skill-network-canvas">
        <svg viewBox="0 0 500 500" className="skill-network-lines" aria-hidden="true">
          <g fill="none" stroke="var(--line-strong)" strokeWidth="1">
            {skillCategories.map((category) => (
              <path key={category.id} d={category.path} />
            ))}
          </g>

          <g fill="none" strokeWidth="1.5" strokeLinecap="round">
            {skillCategories.map((category) => (
              <path
                key={category.id}
                d={category.path}
                className="skill-network-flow"
                data-active={isBranchActive(category.id)}
              />
            ))}
          </g>

          {skillCategories.map((category) =>
            category.skills.map((skill) => (
              <path
                key={`${category.id}-${skill.id}`}
                d={`M${category.anchor.x} ${category.anchor.y} L${skill.x} ${skill.y}`}
                className="skill-branch-line"
                data-active={isBranchActive(category.id)}
                data-skill-active={isSkillActive(category.id, skill.id)}
              />
            )),
          )}

          <circle className="skill-network-packet packet-one" cx="250" cy="250" r="2.5" />
          <circle className="skill-network-packet packet-two" cx="250" cy="250" r="2" />
          <circle className="skill-network-packet packet-three" cx="250" cy="250" r="2" />
        </svg>

        <div className="skill-network-core">
          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/45">
            Runtime
          </span>
          <strong>Engineering</strong>
          <span>System</span>
        </div>

        {skillCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            data-skill-branch
            className={`skill-category-node ${category.position}`}
            data-active={isCategoryActive(category.id)}
            onMouseEnter={() => setActive({ type: "category", id: category.id })}
            onFocus={() => setActive({ type: "category", id: category.id })}
            onClick={() => setActive({ type: "category", id: category.id })}
            aria-pressed={isCategoryActive(category.id)}
          >
            <span className="skill-category-signal" />
            {category.label}
          </button>
        ))}

        {skillCategories.map((category) =>
          category.skills.map((skill) => (
            <button
              key={`${category.id}-${skill.id}`}
              type="button"
              data-skill-branch
              className="skill-leaf-node"
              style={{ left: `${(skill.x / 500) * 100}%`, top: `${(skill.y / 500) * 100}%` }}
              data-category={category.id}
              data-active={isSkillActive(category.id, skill.id)}
              data-branch-active={isBranchActive(category.id)}
              onMouseEnter={() =>
                setActive({ type: "skill", categoryId: category.id, skillId: skill.id })
              }
              onFocus={() =>
                setActive({ type: "skill", categoryId: category.id, skillId: skill.id })
              }
              onClick={() =>
                setActive({ type: "skill", categoryId: category.id, skillId: skill.id })
              }
              aria-pressed={isSkillActive(category.id, skill.id)}
            >
              <span className="skill-leaf-signal" />
              <span>{skill.label}</span>
            </button>
          )),
        )}
      </div>

      <div className="skill-network-detail" aria-live="polite">
        <div>
          <span className="story-kicker">
            {activeSkill ? activeSkill.label : activeCategory.label} /{" "}
            {activeSkill ? "Leaf node" : "Connected services"}
          </span>
          <h3>
            {activeSkill
              ? `${activeCategory.label} dependency`
              : `${activeCategory.skills.length} active nodes`}
          </h3>
        </div>

        {activeSkill ? (
          <p className="skill-detail-copy">{activeCategory.description}</p>
        ) : (
          <div className="skill-node-list">
            {activeCategory.skills.map((skill, index) => (
              <button
                key={skill.id}
                type="button"
                className="skill-node-list-item"
                data-active={isSkillActive(activeCategory.id, skill.id)}
                onMouseEnter={() =>
                  setActive({
                    type: "skill",
                    categoryId: activeCategory.id,
                    skillId: skill.id,
                  })
                }
                onFocus={() =>
                  setActive({
                    type: "skill",
                    categoryId: activeCategory.id,
                    skillId: skill.id,
                  })
                }
                onClick={() =>
                  setActive({
                    type: "skill",
                    categoryId: activeCategory.id,
                    skillId: skill.id,
                  })
                }
              >
                <i />
                <b>{skill.label}</b>
                <small>NODE.0{index + 1}</small>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
