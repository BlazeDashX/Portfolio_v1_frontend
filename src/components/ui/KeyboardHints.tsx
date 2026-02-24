"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const SHORTCUTS = [
    { key: "P", label: "Projects", href: "/projects" },
    { key: "A", label: "About", href: "/about" },
    { key: "R", label: "Research", href: "/research" },
    { key: "C", label: "Contact", href: "/contact" },
    { key: "G", label: "GitHub", href: "https://github.com/BlazeDashX" },
];

const SHOW_DELAY = 2500; // ms after page load before showing
const VISIBLE_MS = 2500; // ms it stays visible before auto-dismiss

export default function KeyboardHints() {
    const router = useRouter();
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);

    // Re-trigger on every route change
    useEffect(() => {
        setVisible(false); // reset on navigate
        const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY);
        const dismissTimer = setTimeout(() => setVisible(false), SHOW_DELAY + VISIBLE_MS);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(dismissTimer);
        };
    }, [pathname]);

    // Keyboard nav
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            const s = SHORTCUTS.find((x) => x.key === e.key.toUpperCase());
            if (s) {
                setVisible(false);
                if (s.href.startsWith("http")) window.open(s.href, "_blank");
                else router.push(s.href);
            }
            if (e.key === "Escape") setVisible(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [router]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="kbd-bar"
                    initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
                    style={{
                        filter: "drop-shadow(0 0 18px color-mix(in srgb, var(--accent) 40%, transparent))",
                    }}
                >
                    {/* Main pill */}
                    <div
                        className="flex items-center gap-1 rounded-2xl border px-3 py-2 relative overflow-hidden"
                        style={{
                            background: "color-mix(in srgb, var(--bg) 96%, transparent)",
                            borderColor: "color-mix(in srgb, var(--accent) 40%, var(--border))",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, var(--border))",
                        }}
                    >
                        {/* ⌨ label */}
                        <span
                            className="mr-2 text-[10px] font-semibold uppercase tracking-widest hidden sm:inline shrink-0"
                            style={{ color: "var(--accent)" }}
                        >
                            ⌨
                        </span>

                        {/* Shortcuts inline */}
                        {SHORTCUTS.map((s, i) => (
                            <div key={s.key} className="flex items-center">
                                <button
                                    onClick={() => {
                                        setVisible(false);
                                        if (s.href.startsWith("http")) window.open(s.href, "_blank");
                                        else router.push(s.href);
                                    }}
                                    className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs transition-all duration-150 hover:scale-105 active:scale-95"
                                    style={{ color: "var(--muted)" }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget as HTMLButtonElement;
                                        el.style.color = "var(--accent)";
                                        el.style.background = "color-mix(in srgb, var(--accent) 12%, transparent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget as HTMLButtonElement;
                                        el.style.color = "var(--muted)";
                                        el.style.background = "transparent";
                                    }}
                                >
                                    <kbd
                                        className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold"
                                        style={{
                                            border: "1px solid color-mix(in srgb, var(--accent) 50%, var(--border))",
                                            color: "var(--accent)",
                                            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                                        }}
                                    >
                                        {s.key}
                                    </kbd>
                                    <span className="hidden sm:inline">{s.label}</span>
                                </button>
                                {i < SHORTCUTS.length - 1 && (
                                    <span className="mx-0.5 text-[10px] opacity-20" style={{ color: "var(--muted)" }}>·</span>
                                )}
                            </div>
                        ))}

                        {/* Divider + close */}
                        <div className="ml-2 pl-2 border-l" style={{ borderColor: "var(--border)" }}>
                            <button
                                onClick={() => setVisible(false)}
                                className="flex items-center justify-center h-5 w-5 rounded text-[11px] transition-all opacity-50 hover:opacity-100 hover:scale-110"
                                style={{ color: "var(--muted)" }}
                                aria-label="Dismiss"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Auto-dismiss progress bar at bottom of pill */}
                        <motion.div
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: VISIBLE_MS / 1000, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full"
                            style={{ background: "var(--accent)", opacity: 0.5 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
