"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme, type Style, type Mode } from "@/components/theme/ThemeProvider";

const THEMES: {
    style: Style;
    label: string;
    desc: string;
    darkAccent: string;
    lightAccent: string;
    icon: string;
}[] = [
        { style: "cyber", label: "Cyber", desc: "Electric teal · Cyberpunk", darkAccent: "#00ffcc", lightAccent: "#00b894", icon: "⚡" },
        { style: "noir", label: "Noir", desc: "Magenta · Neon darkness", darkAccent: "#d946ef", lightAccent: "#e879f9", icon: "🟣" },
        { style: "inferno", label: "Inferno", desc: "Lava orange · Volcanic fire", darkAccent: "#f97316", lightAccent: "#ea580c", icon: "🔥" },
        { style: "aurora", label: "Aurora", desc: "Emerald · Northern lights", darkAccent: "#34d399", lightAccent: "#059669", icon: "🌌" },
        { style: "clean", label: "Clean", desc: "Sky blue · Minimal", darkAccent: "#60a5fa", lightAccent: "#0ea5e9", icon: "✦" },
    ];

interface ThemePickerProps {
    /** Controlled open state from parent — allows mutual close with other menus */
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ThemePicker({ isOpen, onOpenChange }: ThemePickerProps) {
    const { style: activeStyle, mode, setStyle, setMode } = useTheme();

    const currentTheme = THEMES.find((t) => t.style === activeStyle) ?? THEMES[0];
    const accent = mode === "dark" ? currentTheme.darkAccent : currentTheme.lightAccent;

    return (
        <div className="relative">
            {/* Trigger button */}
            <motion.button
                onClick={() => onOpenChange(!isOpen)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                    background: isOpen
                        ? `color-mix(in srgb, ${accent} 15%, var(--bg))`
                        : "var(--bg)",
                    borderColor: isOpen ? accent : "var(--border)",
                    color: "var(--text)",
                    boxShadow: isOpen ? `0 0 14px ${accent}44` : undefined,
                }}
                aria-label="Open theme picker"
            >
                <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{
                        background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
                        boxShadow: `0 0 6px ${accent}`,
                    }}
                />
                <span className="hidden sm:inline">{currentTheme.label}</span>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-3 w-3 shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                </motion.svg>
            </motion.button>

            {/* Dropdown panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop dismiss */}
                        <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border shadow-2xl"
                            style={{
                                // Solid opaque background — won't be transparent regardless of --card value
                                background: mode === "dark"
                                    ? "color-mix(in srgb, #0a0f1a 96%, transparent)"
                                    : "color-mix(in srgb, #f0f4f8 96%, transparent)",
                                borderColor: `${accent}55`,
                                backdropFilter: "blur(20px)",
                                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22`,
                            }}
                        >
                            <div className="p-3 space-y-2">
                                {/* Dark / Light row */}
                                <div
                                    className="flex gap-1.5 rounded-xl p-1"
                                    style={{ background: "rgba(0,0,0,0.25)" }}
                                >
                                    {(["dark", "light"] as Mode[]).map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMode(m)}
                                            className="flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all"
                                            style={
                                                mode === m
                                                    ? { background: accent, color: "#000", boxShadow: `0 0 10px ${accent}88` }
                                                    : { color: "var(--muted)" }
                                            }
                                        >
                                            {m === "dark" ? "🌙 Dark" : "☀️ Light"}
                                        </button>
                                    ))}
                                </div>

                                {/* Theme list */}
                                <div className="space-y-0.5">
                                    {THEMES.map((t) => {
                                        const a = mode === "dark" ? t.darkAccent : t.lightAccent;
                                        const isActive = activeStyle === t.style;
                                        return (
                                            <motion.button
                                                key={t.style}
                                                onClick={() => { setStyle(t.style); onOpenChange(false); }}
                                                whileHover={{ x: 3 }}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all"
                                                style={
                                                    isActive
                                                        ? {
                                                            background: `${a}22`,
                                                            border: `1px solid ${a}55`,
                                                        }
                                                        : {
                                                            border: "1px solid transparent",
                                                        }
                                                }
                                            >
                                                <span
                                                    className="h-5 w-5 shrink-0 rounded-full"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${a}, ${a}66)`,
                                                        boxShadow: isActive ? `0 0 10px ${a}` : undefined,
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span
                                                            className="text-xs font-semibold"
                                                            style={{ color: isActive ? a : "var(--text)" }}
                                                        >
                                                            {t.icon} {t.label}
                                                        </span>
                                                        {isActive && (
                                                            <span className="ml-auto text-[10px] font-bold" style={{ color: a }}>
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>{t.desc}</p>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
