export type ProjectTag = "personal" | "learning" | "university" | "industry" | "design";
export type ResearchStatus = "Published" | "In Progress" | "Submitted" | "Draft";

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  about: string;
  highlights: string[];
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
    research: string[];
  };
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  tags: ProjectTag[];
  href: string;

  // Case study fields
  problem?: string;
  solution?: string;
  features?: string[];
  repoUrl?: string;
  liveUrl?: string;
  images?: string[];
  date?: string; // "YYYY-MM"
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string; // "YYYY-MM"
  credentialUrl: string;
  skills: string[];
  image: string;
}

export interface ResearchItem {
  title: string;
  description: string;
  domain: string;
  status: ResearchStatus;
  tags: string[];
  paperUrl?: string;
  githubUrl?: string;
}