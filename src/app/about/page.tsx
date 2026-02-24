"use client";

import { motion } from "framer-motion";
import { profile, certificates, projects, research } from "@/data";
import PrimaryCTA from "@/components/common/PrimaryCTA";
import Highlights from "@/components/about/Highlights";
import SkillsGrid from "@/components/about/SkillsGrid";
import SkillBars from "@/components/about/SkillBars";
import Timeline from "@/components/about/Timeline";
import Container from "@/components/ui/Container";
import CountUp from "@/components/ui/CountUp";
import AnimatedSection from "@/components/ui/AnimatedSection";

const statsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const statItem = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const quickStats = [
  { label: "Projects", value: projects.length, suffix: "+" },
  { label: "Certificates", value: certificates.length, suffix: "+" },
  { label: "Research Works", value: research.length, suffix: "" },
];

const skillBarGroups = [
  {
    title: "Frontend",
    bars: [
      { label: "React / Next.js", pct: 88 },
      { label: "TypeScript", pct: 82 },
      { label: "Tailwind CSS", pct: 90 },
    ],
  },
  {
    title: "Backend",
    bars: [
      { label: "Node.js / Express", pct: 78 },
      { label: "PostgreSQL", pct: 72 },
      { label: "Redis", pct: 60 },
    ],
  },
  {
    title: "Research / ML",
    bars: [
      { label: "PyTorch (learning)", pct: 45 },
      { label: "OpenCV", pct: 58 },
      { label: "Model Optimization", pct: 40 },
    ],
  },
];

export default function AboutPage() {
  return (
    <Container>
      <div className="space-y-14">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-5"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              About me
            </p>
            <h1 className="text-4xl font-bold text-main">Who I am</h1>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted">{profile.about}</p>
          <div className="flex flex-wrap gap-3">
            <PrimaryCTA href="/projects" label="View Projects" />
            <PrimaryCTA href="/resume" label="Download CV" variant="outline" />
            <PrimaryCTA href="/contact" label="Contact" variant="outline" />
          </div>
        </motion.header>

        {/* Animated stat counters */}
        <motion.section
          variants={statsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {quickStats.map((s) => (
            <motion.div
              key={s.label}
              variants={statItem}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-soft bg-card p-6 text-center"
              style={{ boxShadow: "0 2px 18px rgba(0,0,0,0.2)" }}
            >
              <p className="text-4xl font-bold" style={{ color: "var(--accent)" }}>
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Highlights */}
        <AnimatedSection delay={0.05}>
          <Highlights items={profile.highlights} />
        </AnimatedSection>

        {/* Timeline */}
        {profile.timeline?.length ? (
          <Timeline entries={profile.timeline} />
        ) : null}

        {/* Skill bars */}
        <AnimatedSection delay={0.05}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-main">Skill Proficiency</h2>
            <SkillBars groups={skillBarGroups} />
          </div>
        </AnimatedSection>

        {/* Skills grid */}
        <AnimatedSection delay={0.08}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-main">Tech Stack</h2>
            <SkillsGrid skills={profile.skills} />
          </div>
        </AnimatedSection>

        {/* CTA Footer */}
        <AnimatedSection delay={0.1}>
          <section
            className="rounded-2xl border border-soft bg-card p-6 space-y-4"
            style={{ boxShadow: "0 2px 18px rgba(0,0,0,0.2)" }}
          >
            <h2 className="text-xl font-semibold text-main">Let's build something solid</h2>
            <p className="text-muted">If you want a developer who cares about clean code, structure, and performance — I'm ready.</p>
            <div className="flex flex-wrap gap-3">
              <PrimaryCTA href="/contact" label="Contact Me" />
              <PrimaryCTA href={profile.github} label="GitHub" variant="outline" />
              <PrimaryCTA href={profile.linkedin} label="LinkedIn" variant="outline" />
            </div>
          </section>
        </AnimatedSection>

      </div>
    </Container>
  );
}