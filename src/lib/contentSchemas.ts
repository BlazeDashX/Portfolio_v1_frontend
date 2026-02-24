import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string()).min(1),
  tags: z.array(z.string()).min(1),
  href: z.string().min(1),
  problem: z.string().optional(),
  solution: z.string().optional(),
  features: z.array(z.string()).optional(),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  date: z.string().optional(),
});

export const ProjectsSchema = z.array(ProjectSchema);