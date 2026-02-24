"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
    "SYSTEM BOOT v2.5.0 ............... [OK]",
    "Loading portfolio runtime ......... [OK]",
    "Calibrating UI matrix ............. [OK]",
    "Mounting neural components ........ [OK]",
    "Establishing secure link .......... [OK]",
    "Initializing particle engine ...... [OK]",
    "Compiling design tokens ........... [OK]",
    ">> BOOT SEQUENCE COMPLETE",
];

const LINE_DELAY = 140;  // ms between each terminal line
const PROGRESS_DELAY = BOOT_LINES.length * LINE_DELAY + 300; // start progress after lines
const PROGRESS_DUR = 900;  // ms for bar to fill
const EXIT_DELAY = PROGRESS_DELAY + PROGRESS_DUR + 400; // total time before exit

export default function BootLoader() {
    const [show, setShow] = useState(false);
    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"boot" | "fill" | "granted" | "exit">("boot");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Only show once per session
        if (sessionStorage.getItem("booted")) return;
        sessionStorage.setItem("booted", "1");
        setShow(true);

        // Print terminal lines one by one
        BOOT_LINES.forEach((line, i) => {
            setTimeout(() => {
                setLines((prev) => [...prev, line]);
            }, 300 + i * LINE_DELAY);
        });

        // Progress bar
        setTimeout(() => {
            setPhase("fill");
            const start = performance.now();
            const tick = () => {
                const pct = Math.min(100, ((performance.now() - start) / PROGRESS_DUR) * 100);
                setProgress(Math.round(pct));
                if (pct < 100) requestAnimationFrame(tick);
                else {
                    setPhase("granted");
                    setTimeout(() => setPhase("exit"), 600);
                    setTimeout(() => setShow(false), 1200);
                }
            };
            requestAnimationFrame(tick);
        }, PROGRESS_DELAY);
    }, []);

    if (!mounted || !show) return null;

    const accent = "var(--accent, #00ffcc)";

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-9999 flex flex-col overflow-hidden">
                    {/* ── Top curtain panel ── */}
                    <motion.div
                        className="relative flex-1 flex flex-col items-center justify-end pb-0 overflow-hidden"
                        animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                        style={{ background: "#020408" }}
                    >
                        {/* Scanline overlay */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
                                zIndex: 10,
                            }}
                        />

                        {/* Ambient glow blob */}
                        <div
                            className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[180px]"
                            style={{ background: "color-mix(in srgb, var(--accent, #00ffcc) 8%, transparent)" }}
                        />

                        {/* Content */}
                        <div className="relative z-20 flex flex-col items-center pb-10">
                            {/* REFAT glitch logo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="mb-6 select-none text-center"
                            >
                                <div
                                    className="font-mono text-[clamp(56px,10vw,110px)] font-black tracking-[-0.02em] leading-none"
                                    style={{
                                        color: accent,
                                        textShadow: `0 0 40px color-mix(in srgb, var(--accent, #00ffcc) 60%, transparent), 0 0 80px color-mix(in srgb, var(--accent, #00ffcc) 30%, transparent)`,
                                        fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
                                    }}
                                >
                                    <GlitchText text="REFAT." />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "100%" }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="mt-2 h-px"
                                    style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
                                />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-2 font-mono text-[11px] tracking-[0.35em] uppercase"
                                    style={{ color: accent }}
                                >
                                    Portfolio OS · v2025
                                </motion.p>
                            </motion.div>

                            {/* Progress bar */}
                            {(phase === "fill" || phase === "granted") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div
                                        className="h-[3px] w-64 overflow-hidden rounded-full"
                                        style={{ background: "rgba(255,255,255,0.08)" }}
                                    >
                                        <motion.div
                                            className="h-full rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            style={{
                                                background: `linear-gradient(to right, color-mix(in srgb, var(--accent, #00ffcc) 60%, transparent), var(--accent, #00ffcc))`,
                                                boxShadow: `0 0 10px var(--accent, #00ffcc)`,
                                            }}
                                        />
                                    </div>
                                    <div className="font-mono text-[11px]" style={{ color: accent, opacity: 0.7 }}>
                                        {phase === "granted" ? (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="font-bold tracking-[0.2em]"
                                                style={{ color: accent, textShadow: `0 0 12px ${accent}` }}
                                            >
                                                ✓ ACCESS GRANTED
                                            </motion.span>
                                        ) : (
                                            <span>{progress}%</span>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* ── Divider line ── */}
                    <div className="h-px w-full shrink-0" style={{ background: `color-mix(in srgb, var(--accent, #00ffcc) 30%, transparent)` }} />

                    {/* ── Bottom curtain panel ── */}
                    <motion.div
                        className="relative flex-1 overflow-hidden"
                        animate={phase === "exit" ? { y: "100%" } : { y: 0 }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                        style={{ background: "#020408" }}
                    >
                        {/* Scanline overlay */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
                                zIndex: 10,
                            }}
                        />

                        {/* Terminal lines */}
                        <div className="relative z-20 p-6 pt-4 font-mono text-xs leading-relaxed">
                            {lines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        color: line.startsWith(">>")
                                            ? `var(--accent, #00ffcc)`
                                            : "rgba(255,255,255,0.45)",
                                        fontWeight: line.startsWith(">>") ? 700 : 400,
                                    }}
                                >
                                    {line}
                                </motion.div>
                            ))}
                            {/* Blinking cursor */}
                            {phase === "boot" && (
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-2 h-3 align-middle ml-1"
                                    style={{ background: `var(--accent, #00ffcc)` }}
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

/** Small glitch text effect — CSS animation driven from inline style */
function GlitchText({ text }: { text: string }) {
    return (
        <span
            className="glitch-boot"
            data-text={text}
            style={{ display: "inline-block", position: "relative" }}
        >
            {text}
            <style>{`
        .glitch-boot::before,
        .glitch-boot::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .glitch-boot::before {
          color: #ff00ff;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          animation: glitch-boot-before 2.5s infinite linear;
          opacity: 0.7;
        }
        .glitch-boot::after {
          color: #00ffff;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          animation: glitch-boot-after 2.5s infinite linear;
          opacity: 0.6;
        }
        @keyframes glitch-boot-before {
          0%,87%,89%,94%,96%,100% { transform: translate(0); }
          88% { transform: translate(-4px, 1px); }
          95% { transform: translate(3px, -1px); }
        }
        @keyframes glitch-boot-after {
          0%,90%,92%,97%,99%,100% { transform: translate(0); }
          91% { transform: translate(4px, -2px); }
          98% { transform: translate(-3px, 1px); }
        }
      `}</style>
        </span>
    );
}
