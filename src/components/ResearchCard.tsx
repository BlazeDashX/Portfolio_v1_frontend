"use client";

import Badge from "@/components/ui/Badge";

export type ResearchStatus =
  | "Published"
  | "In Progress"
  | "Planned";

export interface ResearchItem {
  title: string;
  description: string;
  domain: string;
  status: ResearchStatus;
  tags: string[];
  paperUrl?: string;
  githubUrl?: string;
}

export default function ResearchCard({
  item,
}: {
  item: ResearchItem;
}) {
  const statusTone =
    item.status === "Published"
      ? "success"
      : item.status === "In Progress"
      ? "warning"
      : "neutral";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition group">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug">
          {item.title}
        </h3>

        <Badge tone={statusTone}>
          {item.status}
        </Badge>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-white/65 leading-relaxed">
        {item.description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="university">{item.domain}</Badge>

        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} tone="neutral">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Links */}
      <div className="mt-5 flex items-center gap-4 text-sm">
        {item.paperUrl && (
          <a
            href={item.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--mint) hover:opacity-80 transition font-semibold"
          >
            Paper ↗
          </a>
        )}

        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--mint) hover:opacity-80 transition font-semibold"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}