"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Certificate } from "@/types/content";
import Image from "next/image";

export default function CertificateCard({ cert }: { cert: Certificate }) {
    const [open, setOpen] = useState(false);
    const year = cert.date?.split("-")[0] ?? "";

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-soft bg-card p-5"
                style={{ boxShadow: "0 2px 18px rgba(0,0,0,0.25)" }}
            >
                {/* Accent top gradient bar */}
                <div
                    className="absolute left-0 top-0 h-[3px] w-full rounded-t-2xl"
                    style={{ background: "linear-gradient(90deg, var(--accent), var(--accent2))" }}
                />

                {/* Header row */}
                <div className="flex items-start justify-between gap-3 pt-1">
                    <div className="space-y-1">
                        <h3 className="text-base font-semibold text-main leading-snug">{cert.title}</h3>
                        <div className="flex items-center gap-2">
                            <span
                                className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                                style={{ borderColor: "rgba(0,255,204,0.3)", color: "var(--accent)", background: "rgba(0,255,204,0.08)" }}
                            >
                                {cert.issuer}
                            </span>
                            {year && <span className="text-xs text-muted">{year}</span>}
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="shrink-0 rounded-lg border border-soft px-3 py-1.5 text-xs text-main transition-all hover:border-(--accent) hover:text-(--accent)"
                    >
                        Preview
                    </button>
                </div>

                {/* Skills */}
                {cert.skills?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((s) => (
                            <span
                                key={s}
                                className="rounded-full border border-soft bg-card px-2.5 py-0.5 text-xs text-muted"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                ) : null}

                <div className="mt-auto">
                    <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-80"
                        style={{ color: "var(--accent)" }}
                    >
                        Verify credential ↗
                    </a>
                </div>
            </motion.div>

            {/* ── Inline Modal ── */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                        />

                        {/* Panel */}
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-2xl -translate-y-1/2 rounded-2xl border border-soft bg-card p-5 shadow-2xl"
                        >
                            {/* Header */}
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="text-base font-semibold text-main leading-snug">{cert.title}</h2>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="flex h-7 w-7 items-center justify-center rounded-full border border-soft text-sm text-muted transition-colors hover:border-(--accent) hover:text-(--accent)"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Image */}
                            <div className="overflow-hidden rounded-xl border border-soft">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    width={1400}
                                    height={900}
                                    className="h-auto w-full"
                                />
                            </div>

                            {/* Footer */}
                            <div className="mt-4 flex flex-wrap gap-3">
                                <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-lg border border-soft px-4 py-2 text-sm text-main transition-opacity hover:opacity-80"
                                >
                                    Verify Credential ↗
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}