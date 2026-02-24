"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { profile, projects } from "@/data";
import SkillBars from "@/components/about/SkillBars";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const skillBarGroups = [
    {
        title: "Frontend",
        bars: [
            { label: "React / Next.js", pct: 88 },
            { label: "TypeScript", pct: 82 },
            { label: "Tailwind CSS", pct: 90 },
        ],
    },
    {
        title: "Backend",
        bars: [
            { label: "Node.js / Express", pct: 78 },
            { label: "PostgreSQL", pct: 72 },
            { label: "Redis", pct: 60 },
        ],
    },
    {
        title: "Research / ML",
        bars: [
            { label: "PyTorch (learning)", pct: 45 },
            { label: "OpenCV", pct: 58 },
        ],
    },
];

export default function ResumePage() {
    const [copied, setCopied] = useState(false);

    function copyEmail() {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handlePrint() {
        window.print();
    }

    return (
        <Container>
            <div className="mx-auto max-w-3xl">
                <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">

                    {/* Header */}
                    <motion.header variants={fadeUp} className="space-y-4 border-b border-soft pb-6">
                        <div className="space-y-0.5">
                            <h1 className="text-4xl font-bold text-main">{profile.name}</h1>
                            <p className="text-base text-muted">{profile.role}</p>
                            <p className="text-sm text-muted">{profile.location}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 print:hidden">
                            {/* Copy email button */}
                            <button
                                onClick={copyEmail}
                                className="inline-flex items-center gap-2 rounded-lg border border-soft bg-card px-4 py-2 text-sm text-main transition-all hover:border-(--accent)"
                            >
                                {copied ? "✓ Copied!" : profile.email}
                            </button>

                            {/* Print button */}
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 rounded-lg py-2 px-4 text-sm font-semibold transition-all"
                                style={{ background: "var(--accent)", color: "var(--bg)" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a1 1 0 001 1h8a1 1 0 001-1v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1zm2 0h6v3H7V4zm-1 9v-1h8v1H6zm8-4a1 1 0 110 2 1 1 0 010-2z" clipRule="evenodd" />
                                </svg>
                                Print / Save PDF
                            </button>
                        </div>
                    </motion.header>

                    {/* Summary */}
                    <AnimatedSection>
                        <section className="space-y-3">
                            <h2 className="text-lg font-semibold text-main">Summary</h2>
                            <p className="text-sm text-muted leading-relaxed">{profile.about}</p>
                        </section>
                    </AnimatedSection>

                    {/* Skill bars */}
                    <AnimatedSection delay={0.05}>
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-main">Technical Skills</h2>
                            <SkillBars groups={skillBarGroups} />
                        </section>
                    </AnimatedSection>

                    {/* Projects */}
                    <AnimatedSection delay={0.08}>
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-main">Selected Projects</h2>
                            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
                                {projects.slice(0, 4).map((p) => (
                                    <motion.div key={p.slug} variants={fadeUp} className="rounded-xl border border-soft bg-card p-4 space-y-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-semibold text-main text-sm">{p.title}</p>
                                            {p.date && <span className="text-xs text-muted">{p.date}</span>}
                                        </div>
                                        <p className="text-xs text-muted">{p.description}</p>
                                        <p className="text-xs text-muted">
                                            <span className="font-medium text-main">Tech: </span>{p.techStack.join(", ")}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>
                    </AnimatedSection>

                    {/* Education */}
                    <AnimatedSection delay={0.1}>
                        <section className="space-y-3">
                            <h2 className="text-lg font-semibold text-main">Education</h2>
                            <div className="rounded-xl border border-soft bg-card p-4 space-y-0.5">
                                <p className="font-semibold text-sm text-main">B.Sc. in Computer Science</p>
                                <p className="text-xs text-muted">American International University — Bangladesh (AIUB)</p>
                                <p className="text-xs text-muted">2022 – Present</p>
                            </div>
                        </section>
                    </AnimatedSection>

                </motion.div>
            </div>
        </Container>
    );
}