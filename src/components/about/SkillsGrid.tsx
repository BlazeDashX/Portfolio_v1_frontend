"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const chipVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const groupIcons: Record<string, string> = {
  Frontend: "⚡",
  Backend: "🔧",
  Tools: "🛠",
  Research: "🔬",
};

export default function SkillsGrid({
  skills,
}: {
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
    research: string[];
  };
}) {
  const groups = [
    { title: "Frontend", items: skills.frontend },
    { title: "Backend", items: skills.backend },
    { title: "Tools", items: skills.tools },
    { title: "Research", items: skills.research },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {groups.map((g) => (
        <motion.div
          key={g.title}
          variants={cardVariant}
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-soft bg-card p-5 transition-shadow duration-300"
          style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.2)" }}
        >
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-main">
            <span>{groupIcons[g.title] ?? "•"}</span>
            {g.title}
          </h3>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {g.items.map((x) => (
              <motion.span
                key={x}
                variants={chipVariant}
                whileHover={{ scale: 1.1 }}
                className="cursor-default rounded-full border border-soft bg-card px-3 py-1 text-xs text-main"
              >
                {x}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}