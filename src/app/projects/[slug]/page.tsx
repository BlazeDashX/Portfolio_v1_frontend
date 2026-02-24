import { notFound } from "next/navigation";
import { projects } from "@/data";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;

  const slug = decodeURIComponent(rawSlug).trim().toLowerCase();

  const project = projects.find((p) => p.slug.trim().toLowerCase() === slug);

  if (!project) return notFound();

  return <CaseStudyLayout project={project} />;
}

// Optional (recommended for build stability)
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}