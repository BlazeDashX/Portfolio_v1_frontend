"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import ResearchCard from "@/components/ResearchCard";
import { research } from "@/data/research";

export default function ResearchPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return research;

    return research.filter((r) => {
      const hay =
        `${r.title} ${r.description} ${r.domain} ${r.status} ${r.tags.join(" ")}`.toLowerCase();
      return hay.includes(s);
    });
  }, [q]);

  return (
    <PageShell
      title="Research & Publications"
      subtitle="Exploring deep learning, computer vision, and NLP to solve complex real-world problems."
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter by domain, title, or status (e.g., Published)…"
        className="w-full max-w-xl mb-8 p-3 rounded-xl border border-white/10 bg-black/20 text-white/80 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-(--mint)/40"
      />

      {filtered.length === 0 ? (
        <div className="text-white/60 text-sm">
          No research items found. Add items in <span className="text-white/85 font-semibold">src/data/research.ts</span>.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResearchCard key={r.title} item={r} />
          ))}
        </div>
      )}
    </PageShell>
  );
}