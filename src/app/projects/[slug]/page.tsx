import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  // ---- tolerant field mapping (supports old + new shapes) ----
  const title: string = (project as any).title ?? "Untitled Project";

  const description: string =
    (project as any).description ??
    (project as any).summary ??
    (project as any).desc ??
    "";

  const techStack: string[] =
    (project as any).techStack ??
    (project as any).stack ??
    [];

  const tags: string[] =
    (project as any).tags ??
    // support older "kind" field
    ((project as any).kind ? [(project as any).kind] : []);

  const date: string | undefined = (project as any).date;

  const images: string[] = (project as any).images ?? [];

  const problem: string | undefined = (project as any).problem;
  const solution: string | undefined = (project as any).solution;
  const features: string[] = (project as any).features ?? [];

  const liveUrl: string | undefined =
    (project as any).liveUrl ?? (project as any).live ?? (project as any).demoUrl;

  const repoUrl: string | undefined =
    (project as any).repoUrl ?? (project as any).repo ?? (project as any).github;

  // Badge tone helper (optional)
  const toneForTag = (t: string) => {
    if (t === "university") return "university";
    if (t === "industry") return "industry";
    return "neutral";
  };

  return (
    <Container className="pt-24 pb-16 max-w-5xl">
      {/* Top Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
      >
        ← Back to Projects
      </Link>

      {/* Header */}
      <header className="mt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {title}
          </h1>

          {date && (
            <span className="text-white/70 font-mono text-xs md:text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
              {date}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-4 text-lg text-white/70 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {/* tech stack */}
          {techStack.map((t) => (
            <Badge key={t} tone="neutral">
              {t}
            </Badge>
          ))}

          {/* tags: university/industry */}
          {tags.map((t) => (
            <Badge key={t} tone={toneForTag(t)}>
              {t}
            </Badge>
          ))}
        </div>
      </header>

      {/* Main Panel */}
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8">
        {/* Image / Gallery */}
        {images.length > 0 ? (
          <div className="mb-10">
            <div className="text-sm text-white/60 mb-3">Gallery</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className="h-28 md:h-40 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center text-xs text-white/45"
                >
                  {img}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-56 md:h-80 rounded-3xl border border-white/10 bg-black/30 flex items-center justify-center text-white/40 font-mono text-sm mb-10">
            [Image Placeholder]
          </div>
        )}

        {/* Content + Sidebar */}
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            {problem && (
              <section>
                <h2 className="text-2xl font-bold mb-3 border-b border-white/10 pb-2">
                  The Problem
                </h2>
                <p className="text-white/70 leading-relaxed">{problem}</p>
              </section>
            )}

            {solution && (
              <section>
                <h2 className="text-2xl font-bold mb-3 border-b border-white/10 pb-2">
                  The Solution
                </h2>
                <p className="text-white/70 leading-relaxed">{solution}</p>
              </section>
            )}

            {features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-3 border-b border-white/10 pb-2">
                  Key Features
                </h2>
                <ul className="list-disc list-inside space-y-2 text-white/70">
                  {features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* If none of these exist, show something so page never feels empty */}
            {!problem && !solution && features.length === 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-3 border-b border-white/10 pb-2">
                  Overview
                </h2>
                <p className="text-white/65 leading-relaxed">
                  Add <span className="text-white/90 font-medium">problem</span>,{" "}
                  <span className="text-white/90 font-medium">solution</span>, and{" "}
                  <span className="text-white/90 font-medium">features</span> fields in{" "}
                  <span className="text-white/90 font-medium">src/data/projects.ts</span>{" "}
                  to make this page feel like a full case study.
                </p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/10 h-fit">
            <h3 className="font-bold text-lg">Project Links</h3>

            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 rounded-xl font-semibold transition
                           bg-(--amber) text-black hover:opacity-90"
              >
                View Live Site ↗
              </a>
            ) : (
              <div className="w-full py-3 rounded-xl border border-white/10 text-center text-sm text-white/40">
                Live link not added
              </div>
            )}

            {repoUrl ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 rounded-xl font-semibold transition
                           border border-white/15 hover:bg-white/5"
              >
                Source Code ↗
              </a>
            ) : (
              <div className="w-full py-3 rounded-xl border border-white/10 text-center text-sm text-white/40">
                Repo link not added
              </div>
            )}
          </aside>
        </div>
      </div>
    </Container>
  );
}