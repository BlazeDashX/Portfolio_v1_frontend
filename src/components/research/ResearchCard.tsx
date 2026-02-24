import type { ResearchItem } from "@/types/content";

function StatusBadge({ status }: { status: ResearchItem["status"] }) {
  const base = "inline-flex items-center rounded-full border px-3 py-1 text-xs";

  if (status === "Published") return <span className={`${base}`}>✅ Published</span>;
  if (status === "Submitted") return <span className={`${base}`}>📨 Submitted</span>;
  if (status === "In Progress") return <span className={`${base}`}>🛠 In Progress</span>;
  return <span className={`${base}`}>📝 Draft</span>;
}

export default function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <div className="rounded-xl border p-5 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm opacity-70">
            {item.domain}
            {item.year ? ` • ${item.year}` : ""}
            {item.venue ? ` • ${item.venue}` : ""}
          </p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <p className="text-sm opacity-85">{item.abstract}</p>

      {/* Tags */}
      {item.tags?.length ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border px-3 py-1 text-xs opacity-90">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Quick meta */}
      <div className="grid gap-3 pt-2 sm:grid-cols-2">
        {item.datasets?.length ? (
          <div className="rounded-lg border p-3">
            <p className="text-xs opacity-70">Datasets</p>
            <p className="text-sm opacity-90">{item.datasets.join(", ")}</p>
          </div>
        ) : null}

        {item.methods?.length ? (
          <div className="rounded-lg border p-3">
            <p className="text-xs opacity-70">Methods</p>
            <p className="text-sm opacity-90">{item.methods.join(", ")}</p>
          </div>
        ) : null}
      </div>

      {/* Metrics */}
      {item.metrics?.length ? (
        <div className="pt-2 flex flex-wrap gap-2">
          {item.metrics.map((m) => (
            <span key={m.label} className="rounded-full border px-3 py-1 text-xs">
              {m.label}: <span className="font-semibold">{m.value}</span>
            </span>
          ))}
        </div>
      ) : null}

      {/* Links */}
      <div className="pt-3 flex flex-wrap gap-3">
        {item.paperUrl ? (
          <a
            href={item.paperUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Paper ↗
          </a>
        ) : null}

        {item.githubUrl ? (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Code ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}