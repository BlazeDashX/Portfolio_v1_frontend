export type ProjectTag = "university" | "industry";

export type Project = {
  slug: string;
  title: string;
  description: string;      // ✅ use "description" (clear + common)
  techStack: string[];
  tags: ProjectTag[];       // ✅ supports your two-tag requirement
  href?: string;
};