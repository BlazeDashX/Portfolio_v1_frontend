import { notFound } from "next/navigation";
import { projects } from "@/data";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return <CaseStudyLayout project={project} />;
}