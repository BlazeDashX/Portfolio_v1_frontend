"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

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

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data?.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setError("Network error. Try again.");
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="opacity-80">Send me a message — I’ll reply as soon as possible.</p>
      </header>

      <form onSubmit={onSubmit} className="rounded-xl border p-5 space-y-4">
        {/* Honeypot (hidden from humans, bots fill it) */}
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          name="company"
        />

        <div className="space-y-2">
          <label className="text-sm font-semibold">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border bg-transparent px-4 py-2 text-sm outline-none"
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border bg-transparent px-4 py-2 text-sm outline-none"
            placeholder="you@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full min-h-[140px] rounded-lg border bg-transparent px-4 py-2 text-sm outline-none"
            placeholder="Write your message..."
            required
          />
        </div>

        <button
          disabled={status === "loading"}
          className="rounded-lg border px-5 py-2 text-sm disabled:opacity-60"
          type="submit"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" ? (
          <p className="text-sm opacity-90">✅ Message sent successfully!</p>
        ) : null}

        {status === "error" ? (
          <p className="text-sm opacity-90">❌ {error}</p>
        ) : null}
      </form>
    </main>
  );
}