"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ResearchItem } from "@/types/content";

const statusConfig: Record<ResearchItem["status"], { label: string; color: string }> = {
  Published: { label: "✅ Published", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
  Submitted: { label: "📨 Submitted", color: "text-sky-400 border-sky-400/30 bg-sky-400/10" },
  "In Progress": { label: "🛠 In Progress", color: "text-amber-400 border-amber-400/30 bg-amber-400/10" },
  Draft: { label: "📝 Draft", color: "text-gray-400 border-gray-400/30 bg-gray-400/10" },
};

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default function ResearchCard({ item }: { item: ResearchItem }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[item.status];
  const mins = readingTime(item.abstract);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-soft bg-card p-5"
      style={{ boxShadow: "0 2px 18px rgba(0,0,0,0.25)" }}
    >
      {/* Accent left bar */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl"
        style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent2))" }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 pl-3">
        <div className="space-y-1 min-w-0">
          <h3 className="text-base font-semibold text-main leading-snug">{item.title}</h3>
          <p className="text-xs text-muted">
            {item.domain}
            {item.year ? ` • ${item.year}` : ""}
            {item.venue ? ` • ${item.venue}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
          <span className="text-[10px] text-muted">~{mins} min read</span>
        </div>
      </div>

      {/* Abstract — expandable */}
      <div className="pl-3 space-y-1">
        <AnimatePresence initial={false}>
          <motion.div
            key={expanded ? "exp" : "col"}
            initial={false}
            animate={{ height: "auto" }}
            className="overflow-hidden"
          >
            <p className={`text-sm text-muted leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
              {item.abstract}
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-medium transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          {expanded ? "Show less ↑" : "Read more →"}
        </button>
      </div>

      {/* Tags */}
      {item.tags?.length ? (
        <div className="flex flex-wrap gap-1.5 pl-3">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-soft bg-card px-2.5 py-0.5 text-xs text-muted">{t}</span>
          ))}
        </div>
      ) : null}

      {/* Metrics */}
      {item.metrics?.length ? (
        <div className="flex flex-wrap gap-2 pl-3">
          {item.metrics.map((m) => (
            <span key={m.label} className="rounded-full border px-2.5 py-0.5 text-xs text-main" style={{ borderColor: "rgba(0,255,204,0.25)", background: "rgba(0,255,204,0.06)" }}>
              {m.label}: <strong>{m.value}</strong>
            </span>
          ))}
        </div>
      ) : null}

      {/* Links */}
      <div className="flex flex-wrap gap-3 pl-3">
        {item.paperUrl && <a href={item.paperUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-soft px-3 py-1.5 text-xs text-main transition-opacity hover:opacity-80">Paper ↗</a>}
        {item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-soft px-3 py-1.5 text-xs text-main transition-opacity hover:opacity-80">Code ↗</a>}
      </div>
    </motion.div>
  );
}