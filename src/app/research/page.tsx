"use client";

import { useMemo, useState } from "react";
import { research } from "@/data";
import ResearchCard from "@/components/research/ResearchCard";

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    research.forEach((r) => r.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return research.filter((r) => {
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.abstract.toLowerCase().includes(q) ||
        r.domain.toLowerCase().includes(q) ||
        (r.venue || "").toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTag = !activeTag || r.tags.includes(activeTag);

      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Research</h1>
        <p className="opacity-80">
          Academic-style summaries of my research work, experiments, and ongoing directions.
        </p>
      </header>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, domain, tag..."
          className="w-full sm:max-w-md rounded-lg border bg-transparent px-4 py-2 text-sm outline-none"
        />

        <button
          onClick={() => {
            setQuery("");
            setActiveTag(null);
          }}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          Reset
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`rounded-full border px-3 py-1 text-xs ${activeTag === null ? "opacity-100" : "opacity-70"
            }`}
        >
          All
        </button>

        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`rounded-full border px-3 py-1 text-xs ${activeTag === t ? "opacity-100" : "opacity-70"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <section className="grid gap-5 md:grid-cols-2">
        {filtered.map((item) => (
          <ResearchCard key={item.slug} item={item} />
        ))}
      </section>
    </main>
  );
}