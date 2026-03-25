"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function MagneticButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition will-change-transform";

  const solid =
    "hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(255,255,255,.1)]";

  const ghost =
    "border border-soft bg-card text-main hover:-translate-y-0.5";

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} ${variant === "solid" ? solid : ghost}`}
        style={
          variant === "solid"
            ? {
              background: "var(--accent)",
              color: "var(--bg)",
              boxShadow: "0 0 22px color-mix(in srgb, var(--accent) 35%, transparent)",
            }
            : undefined
        }
      >
        {children}
      </Link>
    </motion.div>
  );
}