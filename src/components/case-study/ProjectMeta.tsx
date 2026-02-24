import type { Project } from "@/types/content";

export default function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="mt-6 grid gap-4 rounded-xl border p-5 sm:grid-cols-2">
      <div className="space-y-1">
        <p className="text-sm opacity-70">Role</p>
        <p className="font-medium">{project.role ?? "—"}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm opacity-70">Team</p>
        <p className="font-medium">{project.team ?? "—"}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm opacity-70">Duration</p>
        <p className="font-medium">{project.duration ?? "—"}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm opacity-70">Category</p>
        <p className="font-medium">{project.category ?? "—"}</p>
      </div>

      <div className="space-y-2 sm:col-span-2">
        <p className="text-sm opacity-70">Links</p>
        <div className="flex flex-wrap gap-3">
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
      </div>

      {project.metrics?.length ? (
        <div className="space-y-3 sm:col-span-2">
          <p className="text-sm opacity-70">Impact</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-lg border p-4">
                <p className="text-sm opacity-70">{m.label}</p>
                <p className="text-lg font-semibold">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}