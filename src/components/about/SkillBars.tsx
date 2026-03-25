"use client";

import { motion } from "framer-motion";

interface SkillBar {
    label: string;
    pct: number;    // 0-100
    color?: string;
}

interface Group {
    title: string;
    bars: SkillBar[];
}

export default function SkillBars({ groups }: { groups: Group[] }) {
    return (
        <div className="space-y-6">
            {groups.map((g) => (
                <div key={g.title} className="rounded-2xl border border-soft bg-card p-5 space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">{g.title}</h3>
                    <div className="space-y-3">
                        {g.bars.map((bar) => (
                            <div key={bar.label} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-main">{bar.label}</span>
                                    <span className="text-muted">{bar.pct}%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-card border border-soft">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            background: bar.color ?? "linear-gradient(90deg, var(--accent), var(--accent2))",
                                        }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${bar.pct}%` }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
