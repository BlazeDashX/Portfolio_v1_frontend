export interface Project {
  // Required fields for the ProjectCard
  title: string;
  slug: string;
  description: string; // Replaced 'summary'
  techStack: string[];
  tags: string[];
  href?: string;       // Used by your featured array
  
  // Optional detailed fields for the [slug]/page.tsx Case Study
  problem?: string;
  solution?: string;
  features?: string[];
  repoUrl?: string;
  liveUrl?: string;
  images?: string[];
  date?: string;
}

export const projects: Project[] = [
  {
    slug: "e-commerce-engine",
    title: "E-Commerce Engine",
    description: "A scalable backend with auth, product, orders, and clean architecture.",
    techStack: ["Node.js", "PostgreSQL", "Redis"],
    tags: ["industry", "university"],
    href: "/projects/e-commerce-engine",
    problem: "Existing solutions were too bloated for small-scale high-traffic sales.",
    solution: "Built a microservices architecture using Node.js and Redis to handle concurrent checkouts.",
    features: ["Real-time inventory", "JWT Authentication", "Stripe Payment Integration"],
    repoUrl: "https://github.com/yourusername/e-commerce-engine",
    liveUrl: "https://demo.example.com",
    images: ["/proj1.jpg"],
    date: "2023-10"
  },
  {
    slug: "task-orchestrator",
    title: "Task Orchestrator",
    description: "Kanban-style management with automation workflows and analytics.",
    techStack: ["Next.js", "TypeScript", "D3"],
    tags: ["industry", "university"],
    href: "/projects/task-orchestrator",
    problem: "Teams lose track of sub-task dependencies across multiple sprints.",
    solution: "Developed a graph-based dependency mapping UI that visually links blockers.",
    features: ["Drag & Drop Interface", "Dependency Graphing", "Export reports to PDF"],
    repoUrl: "https://github.com/yourusername/task-orchestrator",
    liveUrl: "https://demo.example.com",
    images: ["/proj2.jpg"],
    date: "2023-12"
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio v2",
    description: "App-router portfolio with motion system + 3D identity background.",
    techStack: ["Next.js", "Tailwind", "Framer Motion"],
    tags: ["personal", "design"],
    href: "/projects/portfolio-v2",
    problem: "Needed a digital presence that stands out to top-tier engineering teams while remaining fast.",
    solution: "Built a highly optimized, motion-rich frontend with a reusable data-driven architecture.",
    features: ["Framer Motion micro-interactions", "Tailwind v4 Styling", "Static Site Generation"],
    repoUrl: "https://github.com/yourusername/portfolio-v2",
    liveUrl: "https://yourportfolio.com",
    images: ["/proj3.jpg"],
    date: "2024-03"
  },
  {
    slug: "weather-radar",
    title: "Weather Radar",
    description: "Global weather tracking using OpenWeather API with a clean, ad-free UI.",
    techStack: ["React", "API Integration", "Tailwind"],
    tags: ["personal", "learning"],
    href: "/projects/weather-radar",
    problem: "Standard weather applications are overly cluttered with ads and unnecessary metrics.",
    solution: "Created a minimalist interface focusing strictly on 7-day trends and live radar.",
    features: ["Location sensing", "Interactive Maps", "Real-time precipitation updates"],
    repoUrl: "https://github.com/yourusername/weather-radar",
    liveUrl: "https://demo.example.com",
    images: ["/proj4.jpg"],
    date: "2024-02"
  }
];