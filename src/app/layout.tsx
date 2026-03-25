import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import ClientEffects from "@/components/ui/ClientEffects";

export const metadata: Metadata = {
  title: "Refat — Portfolio",
  description: "CSE Student • Web Dev • CV/ML Learner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {/* ── z-index -30: Cyberpunk grid/scanline overlay ── */}
          <div className="cyber-bg" />

          {/* ── z-index -20: Ambient accent blur blobs ── */}
          <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: -20 }}
          >
            <div
              className="absolute -top-40 left-1/2 h-[620px] w-[980px] -translate-x-1/2 rounded-full blur-[130px]"
              style={{ background: "color-mix(in srgb, var(--accent) 18%, transparent)" }}
            />
            <div
              className="absolute bottom-[-220px] right-[-220px] h-[560px] w-[560px] rounded-full blur-[120px]"
              style={{ background: "color-mix(in srgb, var(--accent2) 14%, transparent)" }}
            />
          </div>

          {/* ── z-index -10: Subtle noise texture ── */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.18] bg-noise"
            style={{ zIndex: -10 }}
          />

          {/* ── z-index 0: Interactive particles canvas + cursor glow ── */}
          <CursorGlow />
          <ClientEffects />

          {/* ── z-index 10: All visible page content ── */}
          <div className="relative" style={{ zIndex: 10 }}>
            <Navbar />
            <main>
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}