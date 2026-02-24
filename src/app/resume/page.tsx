import PrimaryCTA from "@/components/common/PrimaryCTA";
import { profile, projects } from "@/data";

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 print:px-0 print:py-0">
      {/* Header */}
      <header className="space-y-2 border-b pb-4">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="opacity-80">{profile.role}</p>
        <p className="text-sm opacity-70">
          {profile.location} · {profile.email}
        </p>

        <div className="mt-4 flex gap-3 print:hidden">
          <PrimaryCTA href="/resume.pdf" label="Download PDF" />
          <PrimaryCTA href="/contact" label="Contact" variant="outline" />
        </div>
      </header>

      {/* Summary */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Summary</h2>
        <p className="mt-2 text-sm opacity-90">{profile.about}</p>
      </section>

      {/* Skills */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Technical Skills</h2>
        <div className="mt-2 space-y-1 text-sm opacity-90">
          <p><strong>Frontend:</strong> {profile.skills.frontend.join(", ")}</p>
          <p><strong>Backend:</strong> {profile.skills.backend.join(", ")}</p>
          <p><strong>Tools:</strong> {profile.skills.tools.join(", ")}</p>
          <p><strong>Research:</strong> {profile.skills.research.join(", ")}</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Selected Projects</h2>

        <div className="mt-3 space-y-4 text-sm">
          {projects.slice(0, 3).map((p) => (
            <div key={p.slug}>
              <p className="font-medium">{p.title}</p>
              <p className="opacity-80">{p.description}</p>
              <p className="opacity-70">
                Tech: {p.techStack.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t pt-4 text-xs opacity-70 print:hidden">
        This resume is also available at: /resume
      </footer>
    </main>
  );
}