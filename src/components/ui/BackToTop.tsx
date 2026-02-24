"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 320);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.7, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: 12 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-card shadow-lg transition-transform hover:-translate-y-1"
                    style={{ boxShadow: "0 0 18px color-mix(in srgb, var(--accent) 30%, transparent)" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        className="h-4 w-4"
                        style={{ color: "var(--accent)" }}
                    >
                        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
