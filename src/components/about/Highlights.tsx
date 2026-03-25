"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Highlights({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="rounded-2xl border border-soft bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-main">Highlights</h2>
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="space-y-3"
      >
        {items.map((x) => (
          <motion.li
            key={x}
            variants={item}
            className="flex items-start gap-3 text-sm text-muted"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            {x}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}