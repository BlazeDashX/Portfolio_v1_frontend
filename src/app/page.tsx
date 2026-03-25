"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import dynamic from "next/dynamic";
import ProjectCard from "@/components/project/ProjectCard";
import GitHubStats from "@/components/github/GitHubStats";
import { projects } from "@/data";
import AnimatedSection from "@/components/ui/AnimatedSection";
import TypeWriter from "@/components/ui/TypeWriter";
import Container from "@/components/ui/Container";

const ProfileTilt = dynamic(() => import("@/components/ProfileTilt"), { ssr: false });

export default function HomePage() {
  const featuredSlugs = ["e-commerce-engine", "task-orchestrator", "portfolio-v2"];
  const featured = projects.filter((p) => featuredSlugs.includes(p.slug));

  return (
    <>
      <div className="space-y-16">
        {/* HERO */}
        <section className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-3 rounded-full border border-soft bg-card px-4 py-2 text-xs text-muted"
              >
                <span className="h-2 w-2 rounded-full cyber-glow" style={{ background: "var(--accent)" }} />
                <TypeWriter
                  words={["CSE Student", "Web Developer", "CV/ML Explorer", "Backend Engineer"]}
                  speed={75}
                  deleteSpeed={40}
                  pause={1800}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
                className="mt-6 text-6xl sm:text-7xl font-semibold tracking-tight glitch"
                data-text="Refat."
              >
                <span className="text-main">Ref</span>
                <span style={{ color: "var(--accent)" }}>at</span>
                <span className="text-muted">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
                className="mt-4 text-lg text-muted max-w-xl"
              >
                I build robust systems and craft high-performance web apps — currently exploring
                Computer Vision and deep learning.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href="/projects" variant="solid">
                  View Projects
                </MagneticButton>
                <MagneticButton href="/contact" variant="ghost">
                  Contact Me
                </MagneticButton>
              </div>

              {/* live badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-soft bg-card px-3 py-1.5 text-xs text-muted"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: "var(--accent)" }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                </span>
                Currently building: Portfolio v3 + CV research
              </motion.div>

              {/* status */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {[
                  { k: "Build", v: "Web Systems" },
                  { k: "Stack", v: "Next + TS" },
                  { k: "Research", v: "CV/ML" },
                  { k: "Focus", v: "Quality" },
                ].map((x, idx) => (
                  <div key={x.k} className="rounded-2xl border border-soft bg-card px-4 py-3">
                    <div className="text-xs text-muted">{x.k}</div>
                    <div className="mt-1 text-sm text-main">{x.v}</div>
                    <div className="mt-2 h-1 rounded bg-card overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${[82, 76, 64, 88][idx]}%`,
                          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.08 }}
              className="flex justify-center lg:justify-end"
            >
              <ProfileTilt />
            </motion.div>
          </div>
        </section>

        {/* GITHUB */}
        <AnimatedSection>
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-main">GitHub</h2>
              <a
                className="text-sm text-accent hover:opacity-80 transition"
                href="https://github.com/BlazeDashX"
                target="_blank"
                rel="noreferrer"
              >
                View profile →
              </a>
            </div>
            <GitHubStats />
          </section>
        </AnimatedSection>

        {/* FEATURED */}
        <AnimatedSection delay={0.05}>
          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-main">Featured Work</h2>
              <a className="text-sm text-accent hover:opacity-80 transition" href="/projects">
                View all →
              </a>
            </div>

            <motion.div
              className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {featured.map((p) => (
                <motion.div
                  key={p.slug}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </AnimatedSection>
      </div>
    </>
  );
}
