"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { research } from "@/data";
import ResearchCard from "@/components/research/ResearchCard";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

const pillBase =
  "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer";
const pillActive = "border-transparent text-[color:var(--bg)]";
const pillInactive =
  "border-soft text-muted hover:border-[var(--accent)] hover:text-[color:var(--accent)]";

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
    <Container>
      <div className="space-y-8">

        {/* Header */}
        <AnimatedSection>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              Academic Work
            </p>
            <h1 className="text-4xl font-bold text-main">Research</h1>
            <p className="text-muted max-w-xl">
              Summaries of my research work, experiments, and ongoing directions in CV/ML.
            </p>
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.05}>
          <div className="rounded-2xl border border-soft bg-card p-5 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, domain, tag..."
                className="w-full sm:max-w-sm rounded-lg border border-soft bg-transparent px-4 py-2 text-sm text-main outline-none placeholder:text-muted focus:border-(--accent)"
              />
              <button
                onClick={() => { setQuery(""); setActiveTag(null); }}
                className="rounded-lg border border-soft px-4 py-2 text-sm text-muted hover:border-(--accent) hover:text-(--accent) transition-all"
              >
                Reset
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`${pillBase} ${activeTag === null ? pillActive : pillInactive}`}
                style={activeTag === null ? { background: "var(--accent)" } : {}}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`${pillBase} ${activeTag === t ? pillActive : pillInactive}`}
                  style={activeTag === t ? { background: "var(--accent)" } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results with AnimatePresence */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted"
            >
              No research items match your filters.
            </motion.p>
          ) : (
            <motion.div key="grid" layout className="grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <ResearchCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Container>
  );
}