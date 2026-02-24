import type { Project } from "@/types/content";
import { ProjectsSchema } from "@/lib/contentSchemas";

export const projects: Project[] = [
  {
    slug: "e-commerce-engine",
    title: "E-Commerce Engine",
    description:
      "Scalable e-commerce backend built with clean architecture, caching, and secure authentication.",
    techStack: ["Node.js", "PostgreSQL", "Redis", "JWT"],
    tags: ["industry", "university"],
    href: "/projects/e-commerce-engine",

    // Case study (core)
    problem:
      "As traffic and features grow, many e-commerce backends become slow, tightly coupled, and difficult to extend safely.",
    solution:
      "Implemented a modular backend with clear service boundaries, Redis caching for hot paths, and a reliable auth + order workflow.",
    features: [
      "JWT authentication with role-based access control",
      "Inventory validation to prevent overselling during checkout",
      "Redis caching for fast product listing and detail reads",
      "Order lifecycle management (create/update/cancel)",
      "Layered structure to keep business logic maintainable",
    ],

    // Case study (premium)
    role: "Backend Developer",
    team: "Solo",
    duration: "3 weeks",
    category: "Backend System",
    objectives: [
      "Design a maintainable order + inventory flow",
      "Ensure secure authentication and permission control",
      "Improve read performance using a caching layer",
    ],
    architecture: [
      "PostgreSQL as the source of truth + Redis for caching hot reads",
      "JWT middleware + role checks at the route/service boundary",
      "Service-layer separation for domain logic (auth, products, orders)",
    ],
    challenges: [
      "Handling concurrent checkout without overselling",
      "Keeping module boundaries clean while adding new features",
    ],
    learnings: [
      "Cache invalidation patterns and their tradeoffs",
      "How clean boundaries reduce refactor cost over time",
    ],
    metrics: [
      { label: "Product fetch latency", value: "↓ ~40%" },
      { label: "Cache hit rate", value: "~70%" },
      { label: "Checkout reliability", value: "↑ improved" },
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
      "Kanban-style task manager with dependency visualization, workflow automation, and team analytics.",
    techStack: ["Next.js", "TypeScript", "D3.js", "Tailwind"],
    tags: ["industry", "university"],
    href: "/projects/task-orchestrator",

    // Case study (core)
    problem:
      "Teams lose track of blockers and task dependencies across sprints, causing delays and unclear ownership.",
    solution:
      "Built a workflow tool with a Kanban board plus a dependency graph that highlights blockers and supports automation rules.",
    features: [
      "Drag & drop Kanban board",
      "Dependency graph visualization (blockers/relationships)",
      "Automation rules (status triggers and reminders)",
      "Analytics dashboard (throughput and cycle-time indicators)",
      "Export reports to PDF for sharing and reviews",
    ],

    // Case study (premium)
    role: "Frontend Developer",
    team: "Team of 2",
    duration: "4 weeks",
    category: "Web App",
    objectives: [
      "Improve visibility of blockers and dependencies",
      "Reduce manual tracking using automation rules",
      "Provide actionable team analytics for planning",
    ],
    architecture: [
      "Next.js App Router with typed data models (TypeScript)",
      "D3-driven dependency graph layer for relationships and blockers",
      "Reusable UI components + shared state for board and analytics",
    ],
    challenges: [
      "Keeping graph interactions smooth under frequent updates",
      "Representing complex dependencies without cluttering the UI",
    ],
    learnings: [
      "Graph visualization patterns for product UX",
      "How to balance interaction richness with performance",
    ],
    metrics: [
      { label: "Dependency visibility", value: "↑ clearer" },
      { label: "Planning overhead", value: "↓ reduced" },
      { label: "Reporting time", value: "↓ faster" },
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
      "Premium Next.js portfolio with a motion system, data-driven content, and recruiter-friendly navigation.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    tags: ["personal", "design"],
    href: "/projects/portfolio-v2",

    // Case study (core)
    problem:
      "A typical portfolio looks generic and doesn’t clearly communicate impact, skills, and credibility to recruiters.",
    solution:
      "Built a content-first, typed architecture with a subtle motion layer to enhance UX while keeping performance strong.",
    features: [
      "Micro-interactions using Framer Motion",
      "Single source of truth content structure (data-driven)",
      "Clean routes and information hierarchy",
      "Responsive layout with reusable components",
      "SEO-ready structure for better discoverability",
    ],

    // Case study (premium)
    role: "Frontend Developer",
    team: "Solo",
    duration: "2 weeks",
    category: "Portfolio / Personal Brand",
    objectives: [
      "Create a premium-first impression for recruiters",
      "Make projects/research/certificates easy to maintain",
      "Keep UX smooth without heavy animations",
    ],
    architecture: [
      "Typed content models + centralized data exports",
      "Reusable UI sections + consistent layout primitives",
      "Motion layer applied selectively to key interactions",
    ],
    challenges: [
      "Balancing aesthetics with performance",
      "Keeping content scalable as sections grow",
    ],
    learnings: [
      "How a content system reduces future rewrite effort",
      "Where motion improves UX vs. where it distracts",
    ],
    metrics: [
      { label: "Maintainability", value: "↑ easier updates" },
      { label: "UX polish", value: "↑ improved" },
      { label: "Navigation clarity", value: "↑ better" },
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
      "Minimal weather app focused on practical signals: trends, precipitation, and map-based context—no clutter.",
    techStack: ["React", "TypeScript", "Tailwind", "API Integration"],
    tags: ["personal", "learning"],
    href: "/projects/weather-radar",

    // Case study (core)
    problem:
      "Most weather apps are cluttered with ads and unnecessary metrics, slowing down quick daily decision making.",
    solution:
      "Designed a clean, fast UI that highlights 7-day trends, precipitation, and interactive map context.",
    features: [
      "Location-based weather (auto detect + manual search)",
      "Interactive map view for weather context",
      "7-day trend focused forecast layout",
      "Fast, responsive, ad-free interface",
    ],

    // Case study (premium)
    role: "Frontend Developer",
    team: "Solo",
    duration: "1 week",
    category: "Web App",
    objectives: [
      "Remove clutter and focus on the most useful daily signals",
      "Keep performance high on low-end devices",
      "Provide map-based context without overwhelming UI",
    ],
    architecture: [
      "React component system with reusable UI blocks",
      "API integration layer separated from presentation",
      "Tailwind utility styling for fast iteration and consistency",
    ],
    challenges: [
      "Handling API errors and partial data gracefully",
      "Keeping map interactions smooth while maintaining simplicity",
    ],
    learnings: [
      "Designing for signal-to-noise ratio in product UX",
      "Error handling patterns for external API dependencies",
    ],
    metrics: [
      { label: "UI clutter", value: "↓ reduced" },
      { label: "Time-to-info", value: "↓ faster" },
      { label: "Responsiveness", value: "↑ smoother" },
    ],

    repoUrl: "https://github.com/yourusername/weather-radar",
    liveUrl: "https://demo.example.com",
    images: ["/images/projects/weather-1.jpg", "/images/projects/weather-2.jpg"],
    date: "2024-02",
  },
];

// Runtime validation (fails fast during dev/build if content breaks)
ProjectsSchema.parse(projects);