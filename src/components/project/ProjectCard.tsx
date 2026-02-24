import Link from "next/link";
import type { Project } from "@/types/content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border p-5">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 opacity-80">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="rounded-full border px-3 py-1 text-sm">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <Link
          href={project.href}
          className="underline underline-offset-4"
        >
          Read case study →
        </Link>
      </div>
    </div>
  );
}