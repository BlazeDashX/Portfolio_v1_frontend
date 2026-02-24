"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

const MAX_CHARS = 1000;

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/BlazeDashX", icon: "⌨" },
  { label: "LinkedIn", href: "https://linkedin.com/in/refatlabbi", icon: "💼" },
  { label: "Email", href: "mailto:refat00021@gmail.com", icon: "✉" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) { setStatus("error"); setError(data?.error || "Something went wrong."); return; }
      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setError("Network error. Try again.");
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-xl space-y-8">

        <AnimatedSection>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>Get in touch</p>
            <h1 className="text-4xl font-bold text-main">Contact</h1>
            <p className="text-muted">Send me a message — I'll reply as soon as possible.</p>
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            /* ——— Success panel ——— */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-5 rounded-2xl border border-soft bg-card p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)", border: "2px solid var(--accent)" }}
              >
                ✓
              </motion.div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-main">Message sent!</p>
                <p className="text-sm text-muted">I'll get back to you soon. Thanks for reaching out.</p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-lg border border-soft px-4 py-2 text-sm text-main transition-all hover:border-(--accent) hover:text-(--accent)"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            /* ——— Form ——— */
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-soft bg-card p-6 space-y-5"
              style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
            >
              {/* Honeypot */}
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" name="company" />

              {/* Name */}
              <motion.div custom={0} variants={fieldVariants} className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-soft bg-transparent px-4 py-2.5 text-sm text-main outline-none transition-colors placeholder:text-muted focus:border-(--accent)"
                  placeholder="Your name"
                  required
                />
              </motion.div>

              {/* Email */}
              <motion.div custom={1} variants={fieldVariants} className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  className="w-full rounded-lg border border-soft bg-transparent px-4 py-2.5 text-sm text-main outline-none transition-colors placeholder:text-muted focus:border-(--accent)"
                  placeholder="you@email.com"
                  required
                />
              </motion.div>

              {/* Message + char counter */}
              <motion.div custom={2} variants={fieldVariants} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">Message</label>
                  <span
                    className="text-xs tabular-nums"
                    style={{ color: form.message.length > MAX_CHARS * 0.9 ? "var(--accent2)" : "var(--muted)" }}
                  >
                    {form.message.length} / {MAX_CHARS}
                  </span>
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => { if (e.target.value.length <= MAX_CHARS) setForm({ ...form, message: e.target.value }); }}
                  className="w-full min-h-[140px] rounded-lg border border-soft bg-transparent px-4 py-2.5 text-sm text-main outline-none transition-colors placeholder:text-muted focus:border-(--accent) resize-none"
                  placeholder="Write your message..."
                  required
                />
              </motion.div>

              {/* Submit */}
              <motion.div custom={3} variants={fieldVariants}>
                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full rounded-lg py-2.5 text-sm font-semibold transition-all disabled:opacity-60"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </span>
                  ) : "Send Message →"}
                </button>
              </motion.div>

              {status === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400">
                  ❌ {error}
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        {/* Social links */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                className="flex items-center gap-2 rounded-xl border border-soft bg-card px-4 py-2.5 text-sm text-main transition-all hover:border-(--accent)"
              >
                <span>{s.icon}</span>
                {s.label}
              </motion.a>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </Container>
  );
}