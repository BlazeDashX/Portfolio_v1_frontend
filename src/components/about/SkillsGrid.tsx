export default function SkillsGrid({
  skills,
}: {
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
    research: string[];
  };
}) {
  const groups = [
    { title: "Frontend", items: skills.frontend },
    { title: "Backend", items: skills.backend },
    { title: "Tools", items: skills.tools },
    { title: "Research", items: skills.research },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.title} className="rounded-xl border p-5">
          <h3 className="text-lg font-semibold">{g.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {g.items.map((x) => (
              <span key={x} className="rounded-full border px-3 py-1 text-sm opacity-90">
                {x}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}