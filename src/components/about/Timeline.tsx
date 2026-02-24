"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface TimelineEntry {
    title: string;
    org: string;
    period: string;
    description: string;
    type: "education" | "work" | "research";
}

const typeColors = {
    education: "var(--accent)",
    work: "var(--accent2)",
    research: "#a78bfa",
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const entryVariant = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
    return (
        <AnimatedSection>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-main">Timeline</h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className="relative mt-4 border-l-2 pl-6"
                    style={{ borderColor: "rgba(0,255,204,0.2)" }}
                >
                    {entries.map((e, i) => (
                        <motion.div
                            key={i}
                            variants={entryVariant}
                            className="relative mb-8 last:mb-0"
                        >
                            {/* dot */}
                            <span
                                className="absolute -left-[29px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2"
                                style={{
                                    borderColor: typeColors[e.type],
                                    background: "var(--bg)",
                                    boxShadow: `0 0 10px ${typeColors[e.type]}55`,
                                }}
                            />

                            <div className="rounded-2xl border border-soft bg-card p-4 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="font-semibold text-main text-sm leading-snug">{e.title}</p>
                                        <p className="text-xs text-muted">{e.org}</p>
                                    </div>
                                    <span
                                        className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                                        style={{
                                            background: `color-mix(in srgb, ${typeColors[e.type]} 12%, transparent)`,
                                            color: typeColors[e.type],
                                            border: `1px solid ${typeColors[e.type]}40`,
                                        }}
                                    >
                                        {e.period}
                                    </span>
                                </div>
                                <p className="text-xs text-muted leading-relaxed">{e.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
