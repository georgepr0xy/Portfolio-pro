import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

type Project = {
  index: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  stack: string[];
  signals: number[];
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="project-row group grid border-t border-[var(--line)] lg:grid-cols-[0.55fr_1.25fr_1fr]">
        <div className="flex min-h-52 flex-col justify-between border-r border-[var(--line)] p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{project.index} / Featured system</span>
            <ArrowUpRight className="size-4 text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--navy)]">
              {project.category}
            </p>
            <h3 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{project.title}</h3>
          </div>
        </div>

        <div className="flex min-h-52 flex-col justify-between border-r border-[var(--line)] p-6 lg:p-8">
          <p className="max-w-xl text-base leading-7 text-[var(--muted)]">{project.summary}</p>
          <div className="mt-10 flex flex-wrap gap-2">
            {project.stack.map((item) => <Badge key={item}>{item}</Badge>)}
          </div>
        </div>

        <div className="architecture-grid relative flex min-h-52 flex-col justify-between overflow-hidden p-6 lg:p-8">
          <div className="flex items-end gap-1.5" aria-hidden="true">
            {project.signals.map((signal, index) => (
              <span
                key={`${project.index}-${index}`}
                className="block flex-1 bg-[var(--navy)] opacity-[0.14] transition-opacity duration-300 group-hover:opacity-30"
                style={{ height: `${signal}px` }}
              />
            ))}
          </div>
          <div className="mt-8 border-t border-[var(--line)] pt-4">
            <p className="eyebrow">Measured outcome</p>
            <p className="mt-2 text-sm font-medium">{project.outcome}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
