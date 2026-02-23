"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={8} scale={1.01} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6
                   hover:border-white/20 hover:bg-white/7 transition"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>

          <div className="flex gap-2">
            {project.tags.includes("university") && (
              <Badge tone="university">University</Badge>
            )}
            {project.tags.includes("industry") && (
              <Badge tone="industry">Industry</Badge>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((s) => (
            <span
              key={s}
              className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/80"
            >
              {s}
            </span>
          ))}
        </div>

        {project.href && (
          <a
            href={project.href}
            className="mt-6 inline-flex items-center gap-2 text-sm text-(--mint) hover:opacity-80 transition"
          >
            Read case study <span aria-hidden>→</span>
          </a>
        )}
      </motion.div>
    </Tilt>
  );
}