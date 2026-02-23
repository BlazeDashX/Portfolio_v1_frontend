"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const LINES = [
  "> Initializing portfolio...",
  "> Loading modules: UI / Projects / Research...",
  "> Establishing identity: Refat",
  "> Ready.",
];

export default function BootLoader() {
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState(0);
  const [runId, setRunId] = useState(0);

  // ✅ Show only once per session
  useEffect(() => {
    const seen = sessionStorage.getItem("boot_seen");

    if (!seen) {
      // reset animation states to ensure effects play
      setIdx(0);
      setRunId((v) => v + 1);
      setShow(true);

      sessionStorage.setItem("boot_seen", "1");
    }
  }, []);

  // typing sequence
  useEffect(() => {
    if (!show) return;

    if (idx < LINES.length) {
      const t = setTimeout(() => setIdx((v) => v + 1), 420);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setShow(false), 650);
    return () => clearTimeout(t);
  }, [show, idx]);

  const rendered = useMemo(() => LINES.slice(0, idx), [idx]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={runId}
          className="fixed inset-0 z-999 bg-black text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-[min(780px,92vw)] rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="text-sm tracking-widest uppercase text-white/60">
                  boot sequence
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShow(false)}
                    className="text-xs text-white/50 hover:text-white/80 transition"
                  >
                    Skip
                  </button>

                  <div className="h-2 w-2 rounded-full bg-(--mint) shadow-[0_0_20px_rgba(0,245,212,.6)]" />
                </div>
              </div>

              <div className="mt-5 font-mono text-[13px] leading-6 text-white/85">
                {rendered.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {l}
                  </motion.div>
                ))}
                <span className="inline-block w-2 animate-pulse">▍</span>
              </div>

              <div className="mt-6 h-[2px] w-full bg-white/10 overflow-hidden rounded">
                <motion.div
                  className="h-full bg-(--amber)"
                  initial={{ width: "5%" }}
                  animate={{
                    width:
                      idx >= LINES.length
                        ? "100%"
                        : `${Math.min(95, idx * 28)}%`,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}