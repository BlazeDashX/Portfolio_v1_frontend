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
  stats?: {
    label: string;
    value: string;
  }[];
  timeline?: {
    title: string;
    org: string;
    period: string;
    description: string;
    type: "education" | "work" | "research";
  }[];
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

  // Case study (premium fields)
  role?: string; // e.g. "Full-stack Developer"
  team?: string; // e.g. "Solo / Team of 3"
  duration?: string; // e.g. "3 weeks"
  category?: string; // e.g. "Web App / Backend / Research"

  objectives?: string[];
  architecture?: string[];
  challenges?: string[];
  learnings?: string[];

  metrics?: {
    label: string; // e.g. "Response time"
    value: string; // e.g. "↓ 35%"
  }[];
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
  slug: string;
  title: string;
  abstract: string;

  domain: string; // e.g. "Object Detection"
  status: ResearchStatus;

  tags: string[];

  venue?: string; // e.g. "Preprint / IEEE / Workshop"
  year?: number;

  datasets?: string[];
  methods?: string[];
  metrics?: { label: string; value: string }[];

  paperUrl?: string;  // PDF/DOI/Arxiv link
  githubUrl?: string; // code link
}