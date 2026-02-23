"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import ProfileTilt from "@/components/ProfileTilt";
import ProjectCard from "@/components/ProjectCard";

const featured = [
  {
    slug: "e-commerce-engine",
    title: "E-Commerce Engine",
    description:
      "A scalable backend with auth, product, orders, and clean architecture.",
    techStack: ["Node.js", "PostgreSQL", "Redis"],
    tags: ["industry", "university"], // if you want both ALWAYS
    href: "/projects/e-commerce-engine",
  },
  {
    slug: "task-orchestrator",
    title: "Task Orchestrator",
    description:
      "Kanban-style management with automation workflows and analytics.",
    techStack: ["Next.js", "TypeScript", "D3"],
    tags: ["industry", "university"],
    href: "/projects/task-orchestrator",
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio v2",
    description:
      "App-router portfolio with motion system + 3D identity background.",
    techStack: ["Next.js", "Tailwind", "Framer Motion"],
    tags: ["industry", "university"],
    href: "/projects/portfolio-v2",
  },
];

export default function HomePage() {
  return (
    <>
      {/* === HOME PAGE ONLY BACKGROUND EFFECTS === */}
      <div className="fixed inset-0 -z-10 bg-noise opacity-20 pointer-events-none" />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
      {/* ========================================= */}

      <div className="space-y-16">
        {/* HERO */}
        <section className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70"
              >
                <span className="h-2 w-2 rounded-full bg-(--amber) shadow-[0_0_18px_rgba(255,183,3,.6)]" />
                CSE Student • Web Dev • CV/ML Learner
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
                className="mt-6 text-6xl sm:text-7xl font-semibold tracking-tight"
              >
                <span className="text-white">Ref</span>
                <span className="text-(--amber)">at</span>
                <span className="text-white/60">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
                className="mt-4 text-lg text-white/75 max-w-xl"
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

              {/* Micro “status panel” */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {[
                  { k: "Build", v: "Web Systems" },
                  { k: "Stack", v: "Next + TS" },
                  { k: "Research", v: "CV/ML" },
                  { k: "Focus", v: "Quality" },
                ].map((x, idx) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="text-xs text-white/60">{x.k}</div>
                    <div className="mt-1 text-sm">{x.v}</div>

                    <div className="mt-2 h-1 rounded bg-white/10 overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${[82, 76, 64, 88][idx]}%`,
                          background:
                            "linear-gradient(90deg, rgba(255,183,3,.9), rgba(0,245,212,.9))",
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

        {/* FEATURED */}
        <section>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">Featured Work</h2>
            <a className="text-sm text-(--mint) hover:opacity-80 transition" href="/projects">
              View all →
            </a>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p as any} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}