"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotion } from "@/components/motion/motion-provider";
import { useScrollRefresh } from "@/hooks/use-scroll-refresh";

const deployments = [
  {
    year: "2023",
    release: "Deploy Internship",
    role: "Software Development Intern",
    company: "Engineering internship",
    status: "COMPLETED",
    achievements: [
      "Entered production software development through an engineering internship.",
      "Built practical experience across application delivery and team workflows.",
    ],
    technologies: ["Application development", "APIs", "Web systems"],
    impact: [
      ["Release", "Career initialized"],
      ["Scope", "Product engineering"],
    ],
  },
  {
    year: "2024",
    endYear: "Present",
    release: "Deploy Software Developer",
    role: "Software Developer-1",
    company: "Z1 Tech",
    status: "ACTIVE",
    achievements: [
      "Building AI applications and retrieval-augmented generation systems.",
      "Engineering backend services, event-driven architectures, and analytics platforms.",
      "Connecting modern web experiences to scalable product infrastructure.",
    ],
    technologies: ["FastAPI", "Flask", "Node.js", "RAG", "Cloud Run", "CI/CD"],
    impact: [
      ["Domains", "AI + backend + data"],
      ["Runtime", "Production systems"],
    ],
  },
];

export function DeploymentHistory() {
  const root = useRef<HTMLDivElement>(null);
  const { ready } = useMotion();
  useScrollRefresh();

  useLayoutEffect(() => {
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-deployment-body]", { height: "auto", autoAlpha: 1 });
        gsap.set("[data-deployment-line]", { scaleY: 1 });
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-deployment]").forEach((deployment) => {
        const body = deployment.querySelector("[data-deployment-body]");
        const line = deployment.querySelector("[data-deployment-line]");

        gsap.fromTo(
          body,
          { height: 0, autoAlpha: 0 },
          {
            height: "auto",
            autoAlpha: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: deployment,
              start: "top 68%",
              end: "top 36%",
              scrub: 0.55,
            },
          },
        );

        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: deployment,
              start: "top 72%",
              end: "bottom 45%",
              scrub: 0.45,
            },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, [ready]);

  return (
    <div ref={root} className="deployment-history">
      <div className="deployment-header">
        <span>Deployment history / production career</span>
        <span>2 releases</span>
      </div>

      {deployments.map((deployment, index) => (
        <article key={deployment.release} data-deployment className="deployment-release">
          <div className="deployment-year">
            <span>{deployment.year}</span>
            <span className="deployment-year-line">
              <span data-deployment-line />
            </span>
            {deployment.endYear && <span>{deployment.endYear}</span>}
          </div>

          <div className="deployment-main">
            <div className="deployment-trigger">
              <div>
                <span className="story-kicker">REL.0{index + 1} / {deployment.release}</span>
                <h3>{deployment.role}</h3>
                <p>{deployment.company}</p>
              </div>
              <span className={`deployment-status ${deployment.status === "ACTIVE" ? "is-active" : ""}`}>
                {deployment.status}
              </span>
            </div>

            <div data-deployment-body className="deployment-body">
              <div className="deployment-body-inner">
                <div>
                  <p className="deployment-label">Key achievements</p>
                  <ul className="deployment-achievements">
                    {deployment.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="deployment-label">Technologies</p>
                  <div className="deployment-tech">
                    {deployment.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>

                <div className="deployment-impact">
                  {deployment.impact.map(([label, value]) => (
                    <p key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
