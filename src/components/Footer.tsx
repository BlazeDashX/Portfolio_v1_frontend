"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/certificates", label: "Certificates" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-soft" style={{ background: "color-mix(in srgb, var(--card) 60%, transparent)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Brand column */}
          <div className="space-y-3">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-main">Ref</span>
              <span style={{ color: "var(--accent)" }}>at</span>
              <span className="text-muted">.</span>
            </Link>
            <p className="text-sm text-muted max-w-xs leading-relaxed">
              CSE Student · Web Developer · CV/ML Learner. Building things that matter.
            </p>
            <div className="flex gap-1">
              <span
                className="inline-block h-1 w-8 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="inline-block h-1 w-4 rounded-full opacity-50"
                style={{ background: "var(--accent2)" }}
              />
              <span
                className="inline-block h-1 w-2 rounded-full opacity-25"
                style={{ background: "var(--accent)" }}
              />
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Pages</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-main"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + contact */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Connect</p>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-main"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-colors"
                    style={{ background: "var(--border)" }}
                  />
                  {s.label}
                  <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100 text-xs" style={{ color: "var(--accent)" }}>↗</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-soft pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js + TypeScript.
          </p>
          <p className="text-xs text-muted flex items-center gap-1.5">
            Designed &amp; coded with
            <span style={{ color: "var(--accent)" }}>♥</span>
            in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}