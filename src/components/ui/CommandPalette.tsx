"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { profile } from "@/data/profile";

type Action = {
    id: string;
    label: string;
    icon: string;
    perform: () => void;
};

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { setStyle, setMode } = useTheme();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Reset state when opened
    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    // Define all available actions
    const actions: Action[] = [
        // Navigation
        { id: "home", label: "Go to Home", icon: "🏠", perform: () => router.push("/") },
        { id: "about", label: "Go to About", icon: "👤", perform: () => router.push("/about") },
        { id: "projects", label: "Go to Projects", icon: "🚀", perform: () => router.push("/projects") },
        { id: "research", label: "Go to Research", icon: "🔬", perform: () => router.push("/research") },
        { id: "certs", label: "Go to Certificates", icon: "📜", perform: () => router.push("/certificates") },
        { id: "resume", label: "Go to Resume", icon: "📄", perform: () => router.push("/resume") },
        { id: "contact", label: "Go to Contact", icon: "✉️", perform: () => router.push("/contact") },

        // Theming Actions
        { id: "theme-dark", label: "Set Mode: Dark", icon: "🌙", perform: () => setMode("dark") },
        { id: "theme-light", label: "Set Mode: Light", icon: "☀️", perform: () => setMode("light") },
        { id: "style-cyber", label: "Set Theme: Cyber", icon: "⚡", perform: () => setStyle("cyber") },
        { id: "style-noir", label: "Set Theme: Noir", icon: "🟣", perform: () => setStyle("noir") },
        { id: "style-inferno", label: "Set Theme: Inferno", icon: "🔥", perform: () => setStyle("inferno") },
        { id: "style-aurora", label: "Set Theme: Aurora", icon: "🌌", perform: () => setStyle("aurora") },
        { id: "style-clean", label: "Set Theme: Clean", icon: "✦", perform: () => setStyle("clean") },
        // Social Links
        { id: "social-github", label: "Open GitHub Profile", icon: "🐙", perform: () => window.open(profile.github, "_blank") },
        { id: "social-linkedin", label: "Open LinkedIn Profile", icon: "💼", perform: () => window.open(profile.linkedin, "_blank") },
        { id: "social-email", label: "Send an Email", icon: "✉️", perform: () => window.open(`mailto:${profile.email}`) },

        // Utilities
        { id: "util-copy-url", label: "Copy Page URL", icon: "📋", perform: () => navigator.clipboard.writeText(window.location.href) },

        // System Action: Reboot
        {
            id: "system-reboot",
            label: "Reboot System Sequence",
            icon: "🖥️",
            perform: () => {
                sessionStorage.removeItem("booted");
                window.location.reload();
            }
        },
    ];

    // Filter by query
    const filtered = actions.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard navigation
    useEffect(() => {
        const handleNavigation = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % filtered.length);
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
            }
            if (e.key === "Enter") {
                e.preventDefault();
                const action = filtered[activeIndex];
                if (action) {
                    action.perform();
                    setOpen(false);
                }
            }
        };

        window.addEventListener("keydown", handleNavigation);
        return () => window.removeEventListener("keydown", handleNavigation);
    }, [open, filtered, activeIndex]);

    // Reset index on query change
    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Palette Window */}
                    <div className="fixed inset-0 z-101 flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-2xl pointer-events-auto"
                            style={{
                                borderColor: "var(--border)",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px var(--border)",
                                backgroundColor: "color-mix(in srgb, var(--bg) 95%, transparent)",
                            }}
                        >
                            {/* Input Area */}
                            <div className="flex items-center border-b px-4 py-4" style={{ borderColor: "var(--border)" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-50 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ color: "var(--text)" }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
                                    style={{ color: "var(--text)" }}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="hidden sm:flex items-center gap-1.5 opacity-50">
                                    <kbd className="rounded border px-1.5 py-0.5 text-[10px] font-sans font-medium" style={{ borderColor: "var(--border)", color: "var(--text)" }}>ESC</kbd>
                                    <span className="text-xs" style={{ color: "var(--text)" }}>to close</span>
                                </div>
                            </div>

                            {/* Actions List */}
                            <div className="max-h-[350px] overflow-y-auto py-2 p-2">
                                {filtered.length === 0 ? (
                                    <div className="p-6 text-center text-sm text-muted">
                                        No commands found for "{query}"
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        {filtered.map((action, i) => {
                                            const isActive = activeIndex === i;
                                            return (
                                                <button
                                                    key={action.id}
                                                    onClick={() => {
                                                        action.perform();
                                                        setOpen(false);
                                                    }}
                                                    onMouseEnter={() => setActiveIndex(i)}
                                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors"
                                                    style={{
                                                        backgroundColor: isActive ? "var(--border)" : "transparent",
                                                    }}
                                                >
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-sm border border-soft">
                                                        {action.icon}
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium flex-1"
                                                        style={{ color: isActive ? "var(--accent)" : "var(--text)" }}
                                                    >
                                                        {action.label}
                                                    </span>
                                                    {isActive && (
                                                        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--muted)" }}>
                                                            Enter ↵
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
