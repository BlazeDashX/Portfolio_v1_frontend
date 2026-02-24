import { profile, certificates, projects, research } from "@/data";
import PrimaryCTA from "@/components/common/PrimaryCTA";
import Highlights from "@/components/about/Highlights";
import SkillsGrid from "@/components/about/SkillsGrid";

export default function AboutPage() {
  const quickStats = [
    { label: "Projects", value: String(projects.length) },
    { label: "Certificates", value: String(certificates.length) },
    { label: "Research Works", value: String(research.length) },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="text-base opacity-80">{profile.about}</p>

        <div className="flex flex-wrap gap-3">
          <PrimaryCTA href="/projects" label="View Projects" />
          <PrimaryCTA href="/resume" label="Download CV" variant="outline" />
          <PrimaryCTA href="/contact" label="Contact" variant="outline" />
        </div>
      </header>

      {/* Quick stats */}
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {quickStats.map((s) => (
          <div key={s.label} className="rounded-xl border p-5">
            <p className="text-sm opacity-70">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </section>

      {/* Highlights */}
      <section className="mt-10">
        <Highlights items={profile.highlights} />
      </section>

      {/* Skills */}
      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">Skills</h2>
        <SkillsGrid skills={profile.skills} />
      </section>

      {/* CTA Footer */}
      <section className="mt-12 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Let’s build something solid</h2>
        <p className="mt-2 opacity-80">
          If you want a developer who cares about clean code, structure, and performance — I’m ready.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <PrimaryCTA href="/contact" label="Contact Me" />
          <PrimaryCTA href={profile.github} label="GitHub" variant="outline" />
          <PrimaryCTA href={profile.linkedin} label="LinkedIn" variant="outline" />
        </div>
      </section>
    </main>
  );
}