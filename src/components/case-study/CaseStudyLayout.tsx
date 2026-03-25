import Link from "next/link";
import type { Project } from "@/types/content";
import CaseStudySection from "./CaseStudySection";
import ProjectMeta from "./ProjectMeta";
import ProjectGallery from "./ProjectGallery";

export default function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* breadcrumb */}
      <div className="mb-6 text-sm opacity-80">
        <Link href="/projects" className="underline underline-offset-4">
          Projects
        </Link>
        <span className="px-2">/</span>
        <span className="opacity-90">{project.title}</span>
      </div>

      {/* header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-base opacity-80">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="rounded-full border px-3 py-1 text-sm opacity-90"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* meta */}
      <ProjectMeta project={project} />

      {/* body */}
      <section className="mt-10 space-y-10">
        <CaseStudySection title="Problem">
          <p>{project.problem ?? "Add `problem` in data."}</p>
        </CaseStudySection>

        <CaseStudySection title="Solution">
          <p>{project.solution ?? "Add `solution` in data."}</p>
        </CaseStudySection>

        {project.objectives?.length ? (
          <CaseStudySection title="Objectives">
            <ul className="list-disc space-y-1 pl-5">
              {project.objectives.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </CaseStudySection>
        ) : null}

        {project.features?.length ? (
          <CaseStudySection title="Key Features">
            <ul className="list-disc space-y-1 pl-5">
              {project.features.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </CaseStudySection>
        ) : null}

        {project.architecture?.length ? (
          <CaseStudySection title="Architecture">
            <ul className="list-disc space-y-1 pl-5">
              {project.architecture.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </CaseStudySection>
        ) : null}

        {project.challenges?.length ? (
          <CaseStudySection title="Challenges">
            <ul className="list-disc space-y-1 pl-5">
              {project.challenges.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </CaseStudySection>
        ) : null}

        {project.learnings?.length ? (
          <CaseStudySection title="Learnings">
            <ul className="list-disc space-y-1 pl-5">
              {project.learnings.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </CaseStudySection>
        ) : null}

        <ProjectGallery images={project.images} />
      </section>

      {/* footer nav */}
      <div className="mt-12 flex justify-between border-t pt-6">
        <Link href="/projects" className="underline underline-offset-4">
          ← Back to Projects
        </Link>
        <Link href="/contact" className="underline underline-offset-4">
          Contact →
        </Link>
      </div>
    </main>
  );
}