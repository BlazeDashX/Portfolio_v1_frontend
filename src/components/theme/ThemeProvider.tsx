"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Style = "cyber" | "clean" | "noir" | "inferno" | "aurora";
export type Mode = "dark" | "light";

interface ThemeContextType {
    style: Style;
    mode: Mode;
    setStyle: (s: Style) => void;
    setMode: (m: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "refat-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [style, setStyle] = useState<Style>("cyber");
    const [mode, setMode] = useState<Mode>("dark");

    // Load saved style only — mode always defaults to dark
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const saved = JSON.parse(raw) as Partial<{ style: Style; mode: Mode }>;
            if (saved.style) setStyle(saved.style);
        } catch {
            // ignore
        }
    }, []);

    // Apply to <html> + persist
    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute("data-style", style);
        html.setAttribute("data-mode", mode);
        html.style.setProperty("--mode", mode);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ style, mode }));
        } catch {
            // ignore
        }
    }, [style, mode]);

    return (
        <ThemeContext.Provider value={{ style, mode, setStyle, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}