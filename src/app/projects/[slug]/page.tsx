import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/projects" className="underline underline-offset-4">
          Projects
        </Link>{" "}
        <span className="opacity-60">/</span>{" "}
        <span className="opacity-80">{project.title}</span>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-base opacity-80">{project.description}</p>

        {/* Tech stack chips */}
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

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-3">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border px-4 py-2 text-sm"
            >
              GitHub
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Live Demo
            </a>
          ) : null}
        </div>
      </header>

      {/* Case Study */}
      <section className="mt-10 space-y-10">
        {/* Problem */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Problem</h2>
          <p className="opacity-90">
            {project.problem ?? "Add `problem` in src/data/projects.ts"}
          </p>
        </div>

        {/* Solution */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Solution</h2>
          <p className="opacity-90">
            {project.solution ?? "Add `solution` in src/data/projects.ts"}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Key Features</h2>
          {project.features?.length ? (
            <ul className="list-disc space-y-1 pl-5 opacity-90">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : (
            <p className="opacity-70">
              Add `features: []` in src/data/projects.ts (3–6 bullet points)
            </p>
          )}
        </div>

        {/* Images (optional) */}
        {project.images?.length ? (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Screenshots</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.map((src) => (
                <div key={src} className="overflow-hidden rounded-xl border">
                  {/* Using normal img to keep it simple; you can upgrade to next/image later */}
                  <img
                    src={src}
                    alt={`${project.title} screenshot`}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Footer Nav */}
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