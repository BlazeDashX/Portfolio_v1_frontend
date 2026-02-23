"use client";

import PageShell from "@/components/PageShell";

export default function ContactPage() {
  return (
    <PageShell
      title="Get in touch"
      subtitle="Have a question or a project in mind? Reach out below."
    >
      <form className="space-y-5">
        <div>
          <label className="text-sm text-white/70">Name</label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white/85 focus:outline-none focus:ring-2 focus:ring-(--mint)/40"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Email</label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white/85 focus:outline-none focus:ring-2 focus:ring-(--mint)/40"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Message</label>
          <textarea
            rows={6}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white/85 focus:outline-none focus:ring-2 focus:ring-(--mint)/40"
            placeholder="Tell me about your idea…"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-xl py-3 font-semibold bg-(--amber) text-black hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </PageShell>
  );
}