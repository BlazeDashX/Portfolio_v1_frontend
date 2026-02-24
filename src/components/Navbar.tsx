"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import ThemePicker from "@/components/theme/ThemePicker";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/certificates", label: "Certs" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useTheme(); // keep ThemeProvider context alive

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setThemeOpen(false); }, [pathname]);

  /** Open mobile menu, close theme picker */
  const openMenu = () => { setMenuOpen(true); setThemeOpen(false); };

  /** Controlled theme open: close mobile menu when theme opens */
  const handleThemeOpen = (v: boolean) => {
    setThemeOpen(v);
    if (v) setMenuOpen(false);
  };

  return (
    <>
      {/* ── Floating island pill ── */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto w-full max-w-4xl"
        >
          <div
            className="relative flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-shadow duration-300"
            style={{
              background: scrolled
                ? "color-mix(in srgb, var(--bg) 92%, transparent)"
                : "color-mix(in srgb, var(--bg) 80%, transparent)",
              borderColor: "var(--border)",
              boxShadow: scrolled
                ? "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px var(--border)"
                : "0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px var(--border)",
            }}
          >
            {/* Logo */}
            <Link href="/" className="shrink-0 font-bold text-lg tracking-tight select-none">
              <span style={{ color: "var(--text)" }}>Ref</span>
              <span style={{ color: "var(--accent)" }}>at</span>
              <span style={{ color: "var(--muted)" }}>.</span>
            </Link>

            {/* Desktop nav — sliding pill indicator */}
            <nav className="hidden md:flex items-center gap-0.5">
              {links.map((l) => {
                const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="relative rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-150"
                    style={{ color: active ? "var(--bg)" : "var(--muted)" }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "var(--accent)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Shortcut Hint */}
              <div
                className="hidden lg:flex items-center gap-1 rounded bg-card px-2 py-1 text-[10px] font-medium tracking-wide opacity-60 mr-1"
                style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              >
                <kbd className="font-sans">Ctrl</kbd>+<kbd className="font-sans">K</kbd>
              </div>

              {/* Controlled ThemePicker — closes mobile menu when opened */}
              <ThemePicker isOpen={themeOpen} onOpenChange={handleThemeOpen} />

              {/* Mobile hamburger — closes theme picker when opened */}
              <button
                onClick={() => (menuOpen ? setMenuOpen(false) : openMenu())}
                className="md:hidden flex flex-col justify-center gap-[5px] rounded-lg border border-soft px-2.5 py-2"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                  className="block h-[1.5px] w-5 rounded-full"
                  style={{ background: "var(--text)" }}
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  className="block h-[1.5px] w-5 rounded-full"
                  style={{ background: "var(--text)" }}
                />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                  className="block h-[1.5px] w-5 rounded-full"
                  style={{ background: "var(--text)" }}
                />
              </button>
            </div>
          </div>

          {/* Mobile menu — drops below the island */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  transformOrigin: "top",
                  background: "color-mix(in srgb, var(--bg) 96%, transparent)",
                  borderColor: "var(--border)",
                  backdropFilter: "blur(20px)",
                }}
                className="mt-2 rounded-2xl border px-3 py-3 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-1.5">
                  {links.map((l) => {
                    const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-center transition-all"
                        style={
                          active
                            ? { background: "var(--accent)", color: "var(--bg)" }
                            : { color: "var(--muted)", border: "1px solid var(--border)" }
                        }
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </div>

                {/* ThemePicker in mobile — uses same controlled state */}
                <div className="relative mt-3 border-t pt-3 overflow-visible" style={{ borderColor: "var(--border)" }}>
                  <ThemePicker isOpen={themeOpen} onOpenChange={handleThemeOpen} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}