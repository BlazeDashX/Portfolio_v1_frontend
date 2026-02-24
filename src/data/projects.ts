import type { Project } from "@/types/content";
import { ProjectsSchema } from "@/lib/contentSchemas";

export const projects: Project[] = [
  {
    slug: "e-commerce-engine",
    title: "E-Commerce Engine",
    description:
      "Scalable commerce backend with auth, products, orders, caching, and clean architecture.",
    techStack: ["Node.js", "PostgreSQL", "Redis", "JWT"],
    tags: ["industry", "university"],
    href: "/projects/e-commerce-engine",

    problem:
      "Most starter e-commerce backends become slow and hard to maintain when traffic increases and features (orders, inventory, payments) grow.",
    solution:
      "Designed a modular backend with clear domain separation, caching for hot paths, and reliable auth + order flow handling.",
    features: [
      "JWT authentication + role-based access",
      "Real-time inventory updates (stock validation on checkout)",
      "Caching with Redis for fast product reads",
      "Order lifecycle handling (create, update, cancel)",
      "API design structured for maintainability",
    ],

    repoUrl: "https://github.com/yourusername/e-commerce-engine",
    liveUrl: "https://demo.example.com",
    images: ["/images/projects/ecommerce-1.jpg", "/images/projects/ecommerce-2.jpg"],
    date: "2023-10",
  },

  {
    slug: "task-orchestrator",
    title: "Task Orchestrator",
    description:
      "Kanban-style task manager with dependency tracking, automation workflows, and analytics dashboards.",
    techStack: ["Next.js", "TypeScript", "D3.js", "Tailwind"],
    tags: ["industry", "university"],
    href: "/projects/task-orchestrator",

    problem:
      "Teams lose visibility of blockers and dependencies across sprints, causing delays and unclear ownership.",
    solution:
      "Built a task workflow system with visual dependency graphs and automation rules to reduce manual tracking.",
    features: [
      "Drag & drop Kanban board",
      "Dependency graph visualization (blockers/relationships)",
      "Automation rules (status triggers, reminders)",
      "Analytics dashboard (throughput, cycle time)",
      "Export reports to PDF",
    ],

    repoUrl: "https://github.com/yourusername/task-orchestrator",
    liveUrl: "https://demo.example.com",
    images: ["/images/projects/task-1.jpg", "/images/projects/task-2.jpg"],
    date: "2023-12",
  },

  {
    slug: "portfolio-v2",
    title: "Portfolio v2",
    description:
      "Next.js App Router portfolio with motion system, clean information architecture, and data-driven content.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    tags: ["personal", "design"],
    href: "/projects/portfolio-v2",

    problem:
      "Needed a portfolio that looks premium, loads fast, and clearly communicates projects, research, and credibility.",
    solution:
      "Implemented a content-first architecture (data files + typed models) and a motion layer that enhances UX without sacrificing performance.",
    features: [
      "Framer Motion micro-interactions",
      "Data-driven content (single source of truth)",
      "Clean routing structure for recruiter navigation",
      "Responsive layout and reusable components",
      "SEO-ready page structure",
    ],

    repoUrl: "https://github.com/yourusername/portfolio-v2",
    liveUrl: "https://yourportfolio.com",
    images: ["/images/projects/portfolio-1.jpg", "/images/projects/portfolio-2.jpg"],
    date: "2024-03",
  },

  {
    slug: "weather-radar",
    title: "Weather Radar",
    description:
      "Minimal, ad-free weather app with 7-day forecasts, location support, and interactive map views.",
    techStack: ["React", "TypeScript", "Tailwind", "API Integration"],
    tags: ["personal", "learning"],
    href: "/projects/weather-radar",

    problem:
      "Many weather apps are cluttered, ad-heavy, and show too many irrelevant metrics for quick daily decisions.",
    solution:
      "Built a clean UI focused on the most useful signals: forecast trend, precipitation, and map-based context.",
    features: [
      "Location-based weather (manual + auto detect)",
      "Interactive map layer for weather visualization",
      "7-day trend-focused forecast UI",
      "Fast loading and clean responsive layout",
    ],

    repoUrl: "https://github.com/yourusername/weather-radar",
    liveUrl: "https://demo.example.com",
    images: ["/images/projects/weather-1.jpg", "/images/projects/weather-2.jpg"],
    date: "2024-02",
  },
];

// Runtime validation (fails fast during dev/build if content breaks)
ProjectsSchema.parse(projects);