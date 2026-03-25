"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Certificate } from "@/types/content";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function CertStats({ certs }: { certs: Certificate[] }) {
    const stats = useMemo(() => {
        const issuers = new Set(certs.map((c) => c.issuer));
        const allSkills = certs.flatMap((c) => c.skills ?? []);
        const freq: Record<string, number> = {};
        allSkills.forEach((s) => {
            freq[s] = (freq[s] ?? 0) + 1;
        });
        const topSkill = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
        const years = certs
            .map((c) => c.date?.split("-")[0])
            .filter(Boolean)
            .sort()
            .reverse();
        const latestYear = years[0] ?? "—";

        return [
            { label: "Total Earned", value: certs.length.toString(), icon: "🏆" },
            { label: "Platforms", value: issuers.size.toString(), icon: "🌐" },
            { label: "Top Skill", value: topSkill, icon: "⚡" },
            { label: "Latest", value: latestYear, icon: "📅" },
        ];
    }, [certs]);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
            {stats.map((s) => (
                <motion.div
                    key={s.label}
                    variants={item}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center gap-1 rounded-2xl border border-soft bg-card p-4 text-center"
                    style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}
                >
                    <span className="text-2xl">{s.icon}</span>
                    <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</p>
                    <p className="text-xs text-muted">{s.label}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}
