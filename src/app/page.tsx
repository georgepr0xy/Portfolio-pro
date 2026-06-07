import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { contact } from "@/lib/data";
import { ContactSection } from "@/components/portfolio/contact-section";
import { SectionPlaceholder } from "@/components/portfolio/section-placeholder";
import { StoryNode, StoryPipeline } from "@/components/portfolio/story-pipeline";
import { SystemMap } from "@/components/portfolio/system-map";
import { buttonVariants } from "@/components/ui/button";

const AboutSystemMap = dynamic(
  () => import("@/components/portfolio/about-system-map").then((module) => module.AboutSystemMap),
  { loading: () => <SectionPlaceholder label="About" /> },
);

const DeploymentHistory = dynamic(
  () => import("@/components/portfolio/deployment-history").then((module) => module.DeploymentHistory),
  { loading: () => <SectionPlaceholder label="Experience" /> },
);

const SkillInfrastructure = dynamic(
  () => import("@/components/portfolio/skill-infrastructure").then((module) => module.SkillInfrastructure),
  { loading: () => <SectionPlaceholder label="Skills" /> },
);

const FeaturedProjects = dynamic(
  () => import("@/components/portfolio/featured-projects").then((module) => module.FeaturedProjects),
  { loading: () => <SectionPlaceholder label="Projects" /> },
);

const HowIBuildSystems = dynamic(
  () => import("@/components/portfolio/how-i-build-systems").then((module) => module.HowIBuildSystems),
  { loading: () => <SectionPlaceholder label="Build pipeline" /> },
);

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <StoryPipeline>
          <section
            id="hero"
            data-story-section
            className="story-stage story-stage-hero page-shell pt-24 sm:pt-28"
          >
            <div data-story-content className="story-pane story-pane-left flex flex-col justify-center">
              <p className="story-kicker">System entry / George Province</p>
              <h1 className="mt-8 text-[clamp(3.8rem,7.4vw,7.8rem)] font-medium leading-[0.84] tracking-[-0.085em]">
                George
                <br />
                <span className="text-[var(--muted-light)]">Province.</span>
              </h1>
              <p className="mt-8 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--navy)] sm:text-xs">
                Software Engineer
                <span className="px-2 text-[var(--line-strong)]" aria-hidden="true">
                  |
                </span>
                AI Systems Developer
              </p>
              <p className="mt-8 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                Building AI products, scalable backend systems, event-driven architectures and
                modern web experiences.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#projects" className={buttonVariants({ size: "lg" })}>
                  Traverse selected work
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Open a channel
                </a>
              </div>
            </div>

            <StoryNode index="01" label="Hero" />

            <div data-story-content className="story-pane story-pane-right overflow-hidden">
              <SystemMap />
            </div>
          </section>

          <section id="about" data-story-section className="story-stage page-shell">
            <div data-story-content className="story-pane story-pane-left self-center">
              <p className="story-kicker">Profile / Current runtime</p>
              <h2 className="story-display mt-7">Engineering intelligent systems end to end.</h2>
              <div className="mt-10 border-l-2 border-[var(--navy)] pl-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  Current role
                </p>
                <p className="mt-3 text-xl font-medium tracking-[-0.035em]">
                  Software Developer-1
                </p>
                <p className="mt-1 text-sm text-[var(--navy)]">Z1 Tech</p>
              </div>
              <p className="mt-9 max-w-lg text-base leading-7 text-[var(--muted)]">
                Specializing in AI applications, RAG systems, backend engineering,
                event-driven architecture, and analytics platforms.
              </p>
            </div>

            <StoryNode index="02" label="About" />

            <div data-story-content className="story-pane story-pane-right self-center">
              <AboutSystemMap />
            </div>
          </section>

          <section id="experience" data-story-section className="story-stage page-shell">
            <div data-story-content className="story-pane story-pane-left self-center">
              <DeploymentHistory />
            </div>

            <StoryNode index="03" label="Experience" />

            <div data-story-content className="story-pane story-pane-right self-center">
              <p className="story-kicker">Processing / Experience</p>
              <h2 className="story-display mt-7">
                Engineering across the lifecycle, not just the handoff.
              </h2>
              <p className="mt-8 max-w-lg text-base leading-7 text-[var(--muted)]">
                The work spans discovery, architecture, implementation, deployment, and the
                operational loops that keep software healthy after release.
              </p>
            </div>
          </section>

          <section id="skills" data-story-section className="story-stage page-shell">
            <div data-story-content className="story-pane story-pane-left self-center">
              <p className="story-kicker">Dependencies / Technical range</p>
              <h2 className="story-display mt-7">A stack organized by responsibility.</h2>
              <p className="mt-8 max-w-lg text-base leading-7 text-[var(--muted)]">
                Technologies grouped by the layer they serve — each node connected to the runtime
                that carries product systems from interface to infrastructure.
              </p>
              <div className="mt-10 border-l-2 border-[var(--navy)] pl-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  Network status
                </p>
                <p className="mt-3 text-sm font-medium">5 categories / 25 connected nodes</p>
                <p className="mt-1 text-sm text-[var(--navy)]">All branches operational</p>
              </div>
            </div>

            <StoryNode index="04" label="Skills" />

            <div data-story-content className="story-pane story-pane-right self-center">
              <SkillInfrastructure />
            </div>
          </section>

          <section id="projects" data-story-section className="story-stage page-shell">
            <div data-story-content className="story-pane story-pane-left self-center lg:text-right">
              <p className="story-kicker">Output / Selected systems</p>
              <h2 className="story-display mt-7">Proof carried through working systems.</h2>
              <p className="mt-8 ml-auto max-w-lg text-base leading-7 text-[var(--muted)]">
                Product and platform concepts shaped around visible state, reliable data movement,
                and clear operational ownership.
              </p>
            </div>

            <StoryNode index="05" label="Projects" />

            <div data-story-content className="story-pane story-pane-right self-center">
              <FeaturedProjects />
            </div>
          </section>

          <section id="build-systems" data-story-section className="story-stage-build-systems">
            <HowIBuildSystems />
          </section>

          <section id="contact" data-story-section className="story-stage story-stage-contact page-shell">
            <div data-story-content className="story-pane story-pane-left self-center lg:text-right">
              <p className="story-kicker">Contact</p>
              <h2 className="story-display mt-7">Open a channel.</h2>
            </div>

            <StoryNode index="07" label="Contact" />

            <div data-story-content className="story-pane story-pane-right self-center">
              <ContactSection />
            </div>
          </section>

          <footer className="page-shell flex flex-col gap-3 py-8 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 George Province</p>
            <p>Pipeline complete / Connection remains open</p>
          </footer>
        </StoryPipeline>
      </main>
    </>
  );
}
