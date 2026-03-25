"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/types/content";

const tagColors: Record<string, string> = {
  personal: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  learning: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  university: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  industry: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  design: "text-pink-400 border-pink-400/30 bg-pink-400/10",
};

export default function ProjectCard({ project }: { project: Project }) {
  // 3-D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-soft bg-card"
    >
      {/* Accent top bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: "linear-gradient(90deg, var(--accent), var(--accent2))" }}
      />

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px var(--border), 0 0 40px rgba(0,255,204,0.08)" }}
      />

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Tags + date */}
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${tagColors[tag] ?? "border-soft text-muted bg-card"}`}
              >
                {tag}
              </span>
            ))}
            {project.date && (
              <span className="ml-auto text-xs text-muted">{project.date}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-main leading-snug">{project.title}</h3>
          <p className="text-sm text-muted leading-relaxed line-clamp-3">{project.description}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <motion.span
              key={t}
              whileHover={{ scale: 1.08 }}
              className="rounded-md border border-soft bg-card px-2.5 py-1 text-xs text-main"
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            href={project.href}
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            Case study
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}