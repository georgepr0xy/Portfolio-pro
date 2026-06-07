"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

import { useScrollRefresh } from "@/hooks/use-scroll-refresh";
import { Badge } from "@/components/ui/badge";
import { ProjectArchitecture } from "@/components/portfolio/project-architecture";
import { featuredProjects } from "@/lib/data";

export function FeaturedProjects() {
  useScrollRefresh();
  const root = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState(featuredProjects[0].id);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      featuredProjects.forEach((project) => {
        const body = root.current?.querySelector(`[data-project-body="${project.id}"]`);
        if (!body) return;

        if (reduceMotion) {
          gsap.set(body, {
            height: project.id === expandedId ? "auto" : 0,
            autoAlpha: project.id === expandedId ? 1 : 0,
          });
          return;
        }

        if (project.id === expandedId) {
          gsap.to(body, {
            height: "auto",
            autoAlpha: 1,
            duration: 0.55,
            ease: "power3.out",
          });
        } else {
          gsap.to(body, {
            height: 0,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
        }
      });
    }, root);

    return () => context.revert();
  }, [expandedId]);

  const toggle = (id: string) => {
    setExpandedId((current) => (current === id ? current : id));
  };

  return (
    <div ref={root} className="featured-projects">
      <div className="featured-projects-header">
        <span>Case studies / featured systems</span>
        <span>{featuredProjects.length} deployments</span>
      </div>

      {featuredProjects.map((project) => {
        const isExpanded = expandedId === project.id;

        return (
          <article
            key={project.id}
            data-project-case
            className="featured-project"
            data-expanded={isExpanded}
          >
            <button
              type="button"
              className="featured-project-trigger"
              onClick={() => toggle(project.id)}
              aria-expanded={isExpanded}
            >
              <div className="featured-project-trigger-main">
                <span className="story-kicker">
                  {project.index} / {project.category}
                </span>
                <h3>{project.title}</h3>
              </div>
              <div className="featured-project-trigger-meta">
                <span className={`featured-project-status ${isExpanded ? "is-active" : ""}`}>
                  {isExpanded ? "OPEN" : "CLOSED"}
                </span>
                <ChevronDown className="featured-project-chevron" aria-hidden="true" />
              </div>
            </button>

            <div data-project-body={project.id} className="featured-project-body">
              <div className="featured-project-body-inner">
                <section className="featured-project-section">
                  <p className="featured-project-label">Project overview</p>
                  <p className="featured-project-copy">{project.overview}</p>
                </section>

                <section className="featured-project-section">
                  <p className="featured-project-label">Architecture diagram</p>
                  <ProjectArchitecture
                    architecture={project.architecture}
                    projectId={project.id}
                    active={isExpanded}
                  />
                </section>

                <section className="featured-project-section">
                  <p className="featured-project-label">Tech stack</p>
                  <div className="featured-project-stack">
                    {project.techStack.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </section>

                <section className="featured-project-section">
                  <p className="featured-project-label">Engineering challenges</p>
                  <ul className="featured-project-challenges">
                    {project.challenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                </section>

                <section className="featured-project-section">
                  <p className="featured-project-label">Results</p>
                  <div className="featured-project-results">
                    {project.results.map((result) => (
                      <p key={result.label}>
                        <span>{result.label}</span>
                        <strong>{result.value}</strong>
                      </p>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
