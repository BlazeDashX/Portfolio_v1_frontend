"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/project/ProjectCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags ?? []))).sort();

const pillBase = "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer";
const pillActive = "border-transparent text-[color:var(--bg)]";
const pillInactive = "border-soft text-muted hover:border-(--accent) hover:text-(--accent)";

type Sort = "default" | "alpha" | "tech";

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<Sort>("default");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = projects.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.techStack.some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || (p.tags ?? []).includes(activeTag as any);
      return matchesQuery && matchesTag;
    });
    if (sort === "alpha") items = [...items].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "tech") items = [...items].sort((a, b) => b.techStack.length - a.techStack.length);
    return items;
  }, [query, activeTag, sort]);

  return (
    <Container>
      <div className="space-y-8">

        <AnimatedSection>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>Portfolio</p>
            <h1 className="text-4xl font-bold text-main">Engineering Projects</h1>
            <p className="text-muted">{projects.length} projects — showing {filtered.length}</p>
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.05}>
          <div className="rounded-2xl border border-soft bg-card p-5 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or tech stack..."
                className="w-full sm:max-w-sm rounded-lg border border-soft bg-transparent px-4 py-2 text-sm text-main outline-none placeholder:text-muted focus:border-(--accent)"
              />
              <div className="flex items-center gap-2">
                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="rounded-lg border border-soft bg-card px-3 py-2 text-xs text-main outline-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="alpha">A → Z</option>
                  <option value="tech">Most Tech</option>
                </select>

                {/* View toggle */}
                <div className="flex rounded-lg border border-soft overflow-hidden">
                  {(["grid", "list"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className="px-3 py-2 text-xs transition-colors"
                      style={view === v ? { background: "var(--accent)", color: "var(--bg)" } : { color: "var(--muted)" }}
                    >
                      {v === "grid" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M1 2.5A1.5 1.5 0 012.5 1h2A1.5 1.5 0 016 2.5v2A1.5 1.5 0 014.5 6h-2A1.5 1.5 0 011 4.5v-2zm6 0A1.5 1.5 0 018.5 1h2A1.5 1.5 0 0112 2.5v2A1.5 1.5 0 0110.5 6h-2A1.5 1.5 0 017 4.5v-2zm-6 6A1.5 1.5 0 012.5 7h2A1.5 1.5 0 016 8.5v2A1.5 1.5 0 014.5 12h-2A1.5 1.5 0 011 10.5v-2zm6 0A1.5 1.5 0 018.5 7h2A1.5 1.5 0 0112 8.5v2A1.5 1.5 0 0110.5 12h-2A1.5 1.5 0 017 10.5v-2z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M2 4a1 1 0 000 2h12a1 1 0 100-2H2zm0 4a1 1 0 000 2h12a1 1 0 100-2H2zm0 4a1 1 0 000 2h12a1 1 0 100-2H2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setQuery(""); setActiveTag(null); setSort("default"); }}
                  className="rounded-lg border border-soft px-3 py-2 text-xs text-muted hover:border-(--accent) hover:text-(--accent) transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveTag(null)} className={`${pillBase} ${activeTag === null ? pillActive : pillInactive}`} style={activeTag === null ? { background: "var(--accent)" } : {}}>All</button>
                {allTags.map((tag) => (
                  <button key={tag} onClick={() => setActiveTag(tag)} className={`${pillBase} ${activeTag === tag ? pillActive : pillInactive}`} style={activeTag === tag ? { background: "var(--accent)" } : {}}>{tag}</button>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Cards */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted">
              No projects match your filters.
            </motion.p>
          ) : view === "grid" ? (
            <motion.div key="grid" layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                    <ProjectCard project={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="list" layout className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.slug} layout initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25, delay: i * 0.04 }}>
                    <Link href={p.href} className="group flex items-center justify-between gap-4 rounded-xl border border-soft bg-card px-5 py-4 transition-all hover:border-(--accent)">
                      <div className="min-w-0 space-y-0.5">
                        <p className="font-semibold text-main text-sm truncate">{p.title}</p>
                        <p className="text-xs text-muted line-clamp-1">{p.description}</p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-1.5">
                        {p.techStack.slice(0, 3).map((t) => (
                          <span key={t} className="rounded-md border border-soft px-2 py-0.5 text-[10px] text-muted">{t}</span>
                        ))}
                        {p.techStack.length > 3 && <span className="text-[10px] text-muted">+{p.techStack.length - 3}</span>}
                      </div>
                      <span className="shrink-0 text-sm" style={{ color: "var(--accent)" }}>→</span>
                    </Link>
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