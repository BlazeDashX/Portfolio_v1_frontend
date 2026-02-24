"use client";
import { useState } from 'react';
import { projects } from '@/data/projects';
import { Container } from '@/components/ui/Container';
import ProjectCard from '@/components/project/ProjectCard';

export default function ProjectsPage() {
  const [filter, setFilter] = useState("");

  const filteredProjects = projects.filter(p =>
    p.techStack.some(tech => tech.toLowerCase().includes(filter.toLowerCase())) ||
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold mb-8">Engineering Projects</h1>

      <input
        type="text"
        placeholder="Search by tech stack (e.g. React)..."
        className="w-full max-w-md mb-12 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent"
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </Container>
  );
}