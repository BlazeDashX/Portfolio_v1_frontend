import type { Project } from "@/types/content";
import { ProjectsSchema } from "@/lib/contentSchemas";

export const projects: Project[] = [
  // ─────────────────────────────────────────────
  // 1. FLAGSHIP — Projexly (saas-pm)
  // ─────────────────────────────────────────────
  {
    slug: "projexly",
    title: "Projexly",
    description:
      "Production SaaS for freelancers and agencies — Kanban boards, client portals, team collaboration, and Stripe subscription billing under one roof.",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "TypeScript", "Tailwind"],
    tags: ["industry", "personal"],
    href: "/projects/projexly",

    problem:
      "Freelancers and small agencies juggle project tracking, client updates, and billing across separate tools — creating friction, missed payments, and poor client trust.",
    solution:
      "Built a unified SaaS platform with role-based project management, a shareable client portal requiring no login, and automated Stripe-powered subscription tiers.",
    features: [
      "Kanban boards with drag-and-drop task management and priority labels",
      "Client portal — secure, read-only project view with no account required",
      "Stripe billing with FREE / PRO plan enforcement (up to 3 or unlimited projects)",
      "Team collaboration with invite links and owner-controlled access approval",
      "Analytics dashboard tracking task throughput and project progress",
      "Inline task comments with role badges and activity feed",
      "Export reports to PDF and CSV",
    ],

    role: "Full-Stack Developer",
    team: "Solo",
    duration: "Ongoing",
    category: "SaaS Product",
    objectives: [
      "Build a real, shippable SaaS with end-to-end billing and auth",
      "Provide client-facing visibility without requiring client accounts",
      "Enforce plan limits programmatically via Stripe webhooks",
    ],
    architecture: [
      "Next.js App Router frontend + NestJS REST API backend",
      "PostgreSQL (Neon) with Prisma ORM for typed data access",
      "Stripe Checkout + webhook-driven plan enforcement",
      "Resend for transactional email (Mailtrap in dev)",
      "Deployed on Vercel (frontend) + Railway (backend)",
    ],
    challenges: [
      "Syncing Stripe subscription state reliably via webhooks without race conditions",
      "Designing a client portal that feels polished without requiring authentication",
      "Keeping FREE and PRO limits enforced at both UI and API layers",
    ],
    learnings: [
      "How to architect a multi-tier SaaS with real billing from scratch",
      "Webhook idempotency patterns for payment event handling",
      "Balancing feature richness with a clean, non-overwhelming UX",
    ],
    metrics: [
      { label: "Billing integration", value: "Full Stripe" },
      { label: "Plan tiers", value: "FREE + PRO" },
      { label: "Client portal", value: "No login required" },
    ],

    repoUrl: "https://github.com/BlazeDashX/saas-pm",
    liveUrl: "https://www.projexly.app/",
    images: [],
    date: "2025-01",
  },

  // ─────────────────────────────────────────────
  // 2. Ayanco — Client Work (B2B Trade Corp)
  // ─────────────────────────────────────────────
  {
    slug: "ayanco-trade",
    title: "Ayanco Trade",
    description:
      "Premium B2B corporate site for a global trade company — multi-section landing, product catalog, quote request flow, and SEO-ready architecture.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    tags: ["industry"],
    href: "/projects/ayanco-trade",

    problem:
      "Ayanco Trade Corporation needed a credible, international-facing web presence that communicated verified sourcing, trade compliance, and product verticals to enterprise buyers across South Asia and the Gulf.",
    solution:
      "Built a content-rich Next.js site with animated hero sections, a multi-vertical product catalog, a structured inquiry-to-delivery process flow, and a quote request system.",
    features: [
      "Multi-section marketing landing page with animated trust indicators",
      "Three-vertical product catalog (Food, Industrial, Machinery)",
      "Structured 4-step trade process visualization",
      "Quote request form with product and timeline fields",
      "Testimonial section, FAQ, Why Ayanco, and About pages",
      "SEO-ready metadata and responsive layout throughout",
    ],

    role: "Frontend Developer",
    team: "Solo",
    duration: "~2 weeks",
    category: "Corporate / Client Site",
    objectives: [
      "Establish international credibility for enterprise procurement teams",
      "Communicate trade compliance, certifications, and process clearly",
      "Make quote requests and contact frictionless",
    ],
    architecture: [
      "Next.js App Router with typed content and reusable section components",
      "Tailwind utility styling for rapid, consistent layout",
      "Deployed on Vercel with optimized image handling via next/image",
    ],
    challenges: [
      "Conveying trust and scale through visual design without real photography",
      "Keeping a large content surface maintainable across many pages",
    ],
    learnings: [
      "How information architecture affects B2B conversion flows",
      "Designing for credibility first, aesthetics second",
    ],
    metrics: [
      { label: "Pages shipped", value: "8+" },
      { label: "Product verticals", value: "3" },
      { label: "Status", value: "Live" },
    ],

    repoUrl: "https://github.com/BlazeDashX/Ayanco-frontend",
    liveUrl: "https://ayanco-frontend.vercel.app/",
    images: [],
    date: "2024-11",
  },

  // ─────────────────────────────────────────────
  // 3. Portfolio v1
  // ─────────────────────────────────────────────
  {
    slug: "portfolio-v1",
    title: "Portfolio v1",
    description:
      "First personal portfolio — command-palette navigation, GitHub stats integration, typed content architecture, and a dark cyber aesthetic.",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    tags: ["personal", "design"],
    href: "/projects/portfolio-v1",

    problem:
      "Needed a personal site that went beyond a static resume — something that communicated technical personality, showed real projects, and was easy to maintain as content grew.",
    solution:
      "Built a typed, data-driven portfolio with a command-palette (Ctrl+K) for power navigation, GitHub stats widget, and a clean multi-section layout including Projects, Research, Certificates, and Resume.",
    features: [
      "Command palette (Ctrl+K) for keyboard-driven navigation",
      "GitHub stats widget with live profile data",
      "Data-driven project, research, and certificate sections",
      "Typed content models for maintainability",
      "Cyber-themed dark UI with custom font and layout system",
    ],

    role: "Frontend Developer",
    team: "Solo",
    duration: "2 weeks",
    category: "Portfolio / Personal Brand",
    objectives: [
      "Create a strong first impression with recruiter-friendly structure",
      "Make all content sections easy to update from a single data file",
      "Stand out with interactive UX details like command palette",
    ],
    architecture: [
      "Next.js App Router with centralized content exports",
      "Typed schemas for all content sections",
      "Tailwind utility classes for theme consistency",
    ],
    challenges: [
      "Designing a command palette that felt native, not gimmicky",
      "Balancing dark aesthetic with readability",
    ],
    learnings: [
      "Where interaction details elevate perceived quality",
      "How a content schema reduces future rewrite cost",
    ],
    metrics: [
      { label: "Sections", value: "6 (Home, About, Projects, Research, Certs, Contact)" },
      { label: "Status", value: "Live" },
    ],

    repoUrl: "https://github.com/BlazeDashX/Portfolio_v1_frontend",
    liveUrl: "https://refatmdlabbi.vercel.app/",
    images: [],
    date: "2024-10",
  },

  // ─────────────────────────────────────────────
  // 4. Schedulix Business Suite (WIP)
  // ─────────────────────────────────────────────
  {
    slug: "schedulix-business-suite",
    title: "Schedulix Business Suite",
    description:
      "Production-grade appointment booking SaaS for service businesses — scheduling, Stripe payments, and email confirmations. Currently in development.",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Resend", "TypeScript"],
    tags: ["industry", "personal"],
    href: "/projects/schedulix-business-suite",

    problem:
      "Service businesses (salons, clinics, coaches) rely on manual booking via DMs and calls — causing double-bookings, missed follow-ups, and zero payment automation.",
    solution:
      "Building a white-label appointment booking system with calendar scheduling, Stripe-powered payment collection, and automated email confirmations via Resend.",
    features: [
      "Calendar-based appointment booking UI",
      "Stripe payment collection at time of booking",
      "Automated email confirmations and reminders via Resend",
      "Business dashboard for availability and booking management",
      "Frontend on Vercel, backend on Railway",
    ],

    role: "Full-Stack Developer",
    team: "Solo",
    duration: "In progress",
    category: "SaaS Product",
    objectives: [
      "Build a reusable booking engine adaptable to multiple service verticals",
      "Automate the full booking-to-payment-to-confirmation flow",
      "Keep the client-side booking experience frictionless",
    ],
    architecture: [
      "Next.js 14 App Router + shadcn/ui component system",
      "NestJS + Prisma + PostgreSQL (Neon) on the backend",
      "Stripe for payment intent and Resend for transactional email",
    ],
    challenges: [
      "Handling timezone-aware scheduling without conflicts",
      "Keeping the booking flow under 3 steps for end-users",
    ],
    learnings: [],
    metrics: [
      { label: "Status", value: "In development" },
    ],

    repoUrl: "https://github.com/BlazeDashX/schedulix-business-suite",
    images: [],
    date: "2025-03",
  },

  // ─────────────────────────────────────────────
  // 5. Crown Clothing (Next.js)
  // ─────────────────────────────────────────────
  {
    slug: "crown-clothing",
    title: "Crown Clothing",
    description:
      "Full-featured e-commerce storefront rebuilt in Next.js — product browsing, cart management, and a polished shopping experience.",
    techStack: ["Next.js", "TypeScript", "JavaScript", "Tailwind"],
    tags: ["personal", "learning"],
    href: "/projects/crown-clothing",

    problem:
      "Classic e-commerce UX patterns (product grid, cart drawer, checkout flow) are deceptively complex to build correctly with state management and routing handled well.",
    solution:
      "Rebuilt a full clothing storefront in Next.js with proper App Router structure, cart state management, and a clean product/collection browsing experience.",
    features: [
      "Product catalog with collection-based browsing",
      "Cart state management with item add/remove/update",
      "Responsive product grid and detail views",
      "Clean checkout flow layout",
    ],

    role: "Frontend Developer",
    team: "Solo",
    duration: "1 week",
    category: "E-Commerce / Learning",
    objectives: [
      "Master Next.js App Router patterns in a real-world e-commerce context",
      "Build reusable cart and product state management",
      "Produce a portfolio-quality storefront UI",
    ],
    architecture: [
      "Next.js App Router with client/server component split",
      "React state for cart with context or reducer pattern",
      "Tailwind utility styling",
    ],
    challenges: [
      "Deciding the right client/server component split for cart interactions",
    ],
    learnings: [
      "Next.js App Router mental model for data-fetching vs. interactive components",
      "How cart state propagation differs from page-level state",
    ],
    metrics: [
      { label: "Type", value: "Learning / portfolio project" },
    ],

    repoUrl: "https://github.com/BlazeDashX/crown-clothing-nextJS",
    images: [],
    date: "2024-08",
  },

  // ─────────────────────────────────────────────
  // 6. CarHub — C# / ASP.NET
  // ─────────────────────────────────────────────
  {
    slug: "carhub",
    title: "CarHub",
    description:
      "Car dealership management system built in C# and ASP.NET — inventory tracking, sales records, and a structured MVC architecture.",
    techStack: ["C#", "ASP.NET", ".NET"],
    tags: ["university"],
    href: "/projects/carhub",

    problem:
      "Dealerships managing vehicle inventory and sales transactions through spreadsheets face data integrity issues and no centralized view of stock or sales history.",
    solution:
      "Built a structured MVC application in C# / ASP.NET for managing car inventory, recording sales transactions, and querying stock status.",
    features: [
      "Vehicle inventory CRUD (add, update, remove listings)",
      "Sales transaction recording and history",
      "MVC architecture with clean separation of concerns",
      "Structured data layer with .NET conventions",
    ],

    role: "Backend Developer",
    team: "Solo",
    duration: "University project",
    category: "Desktop / Web App",
    objectives: [
      "Apply OOP principles and MVC pattern in a real domain",
      "Build a functional data management system end-to-end",
    ],
    architecture: [
      "ASP.NET MVC with C# controllers, models, and views",
      "Entity Framework or ADO.NET for data access",
    ],
    challenges: [
      "Learning C# and ASP.NET conventions while building a real system",
    ],
    learnings: [
      "MVC architecture fundamentals transferable across frameworks",
      "Strongly typed language patterns and how they improve reliability",
    ],
    metrics: [
      { label: "Language", value: "C# / .NET" },
      { label: "Pattern", value: "MVC" },
    ],

    repoUrl: "https://github.com/BlazeDashX/CarHub",
    images: [],
    date: "2023-06",
  },

  // ─────────────────────────────────────────────
  // 7. safeNet — PHP MVC
  // ─────────────────────────────────────────────
  {
    slug: "safenet",
    title: "SafeNet",
    description:
      "Full-stack PHP web app with custom MVC architecture — user authentication, role-based access, and a structured controllers/models/views layout.",
    techStack: ["PHP", "CSS", "JavaScript", "MySQL"],
    tags: ["university"],
    href: "/projects/safenet",

    problem:
      "Building a secure web application from first principles — no framework scaffolding, just raw PHP with proper separation of concerns and auth.",
    solution:
      "Implemented a custom MVC framework in PHP with authentication, role-based access control, and a clean separation of controllers, models, and views.",
    features: [
      "Custom PHP MVC architecture (no framework)",
      "User authentication with session management",
      "Role-based access control",
      "Structured controllers, models, and views",
    ],

    role: "Full-Stack Developer",
    team: "Solo",
    duration: "University project",
    category: "Web App",
    objectives: [
      "Understand MVC from the ground up without relying on a framework",
      "Implement authentication and access control manually",
    ],
    architecture: [
      "Custom PHP router with controller dispatch",
      "Model layer interacting with MySQL via PDO",
      "Vanilla JS and CSS on the frontend",
    ],
    challenges: [
      "Building a router and dispatcher without a framework",
      "Handling auth state securely across pages",
    ],
    learnings: [
      "How MVC frameworks abstract routing and dispatch under the hood",
      "Session-based auth fundamentals",
    ],
    metrics: [
      { label: "Architecture", value: "Custom MVC" },
      { label: "Auth", value: "From scratch" },
    ],

    repoUrl: "https://github.com/BlazeDashX/safeNet",
    images: [],
    date: "2022-12",
  },

  // ─────────────────────────────────────────────
  // 8. PlayVerse — PHP
  // ─────────────────────────────────────────────
  {
    slug: "playverse",
    title: "PlayVerse",
    description:
      "Game management and community platform built in PHP — catalog browsing, user management, and a structured backend with CSS/JS frontend.",
    techStack: ["PHP", "CSS", "JavaScript", "MySQL"],
    tags: ["university"],
    href: "/projects/playverse",

    problem:
      "University project exploring full-stack development — managing a game catalog with user accounts and a browsable community-facing interface.",
    solution:
      "Built a multi-page PHP application with a Management module for CRUD operations, user handling, and a styled frontend for browsing game listings.",
    features: [
      "Game catalog with browse and search",
      "Admin management module for CRUD operations",
      "User account system",
      "Responsive CSS/JS frontend",
    ],

    role: "Full-Stack Developer",
    team: "Solo",
    duration: "University project",
    category: "Web App",
    objectives: [
      "Apply full-stack PHP skills to a real domain problem",
      "Build an admin and user-facing layer in the same application",
    ],
    architecture: [
      "PHP backend with MySQL data layer",
      "Structured Management module folder",
      "Vanilla JS and CSS for interactivity and styling",
    ],
    challenges: [
      "Separating admin and public-facing logic cleanly in vanilla PHP",
    ],
    learnings: [
      "How to scope user roles and admin panels in a single codebase",
    ],
    metrics: [
      { label: "Type", value: "University project" },
    ],

    repoUrl: "https://github.com/BlazeDashX/PlayVerse",
    images: [],
    date: "2022-08",
  },

  // ─────────────────────────────────────────────
  // 9. freelancer.pro — PHP
  // ─────────────────────────────────────────────
  {
    slug: "freelancer-pro",
    title: "Freelancer Pro",
    description:
      "Freelance marketplace platform built in PHP — service listings, client-freelancer matching, and a structured project-root architecture.",
    techStack: ["PHP", "CSS", "JavaScript"],
    tags: ["university"],
    href: "/projects/freelancer-pro",

    problem:
      "University exploration of a marketplace model — connecting clients posting jobs with freelancers offering services, all in vanilla PHP.",
    solution:
      "Built a two-sided marketplace with service/job listings, user roles (client and freelancer), and a clean project-root code structure.",
    features: [
      "Service and job listing pages",
      "Two-sided user roles (client / freelancer)",
      "Browse and match flow",
      "Structured project-root codebase",
    ],

    role: "Full-Stack Developer",
    team: "Solo",
    duration: "University project",
    category: "Web App / Marketplace",
    objectives: [
      "Understand two-sided marketplace logic and user role separation",
      "Build a multi-page PHP app with a logical folder structure",
    ],
    architecture: [
      "PHP with a project-root folder structure",
      "CSS and vanilla JS for frontend",
    ],
    challenges: [
      "Managing separate permission flows for client and freelancer roles",
    ],
    learnings: [
      "Two-sided platform data modeling fundamentals",
    ],
    metrics: [
      { label: "Type", value: "University project" },
    ],

    repoUrl: "https://github.com/BlazeDashX/freelancer.pro",
    images: [],
    date: "2022-05",
  },

  // ─────────────────────────────────────────────
  // 10. Learning Platform (WIP)
  // ─────────────────────────────────────────────
  {
    slug: "learning-platform",
    title: "Learning Platform",
    description:
      "Course-based learning platform frontend in early development — structured around Next.js App Router with a modular section layout.",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    tags: ["personal"],
    href: "/projects/learning-platform",

    problem:
      "Exploring the architecture of an LMS-style platform — course listings, lesson navigation, and a clean learner-facing experience.",
    solution:
      "Early-stage frontend scaffolding with Next.js App Router, typed content structure, and a modular layout split across app and frontend directories.",
    features: [
      "Course listing and detail page scaffolding",
      "Typed Next.js App Router structure",
      "Modular section layout",
    ],

    role: "Frontend Developer",
    team: "Solo",
    duration: "In progress",
    category: "Web App / WIP",
    objectives: [
      "Design a scalable LMS frontend architecture",
      "Explore course and lesson content modeling in TypeScript",
    ],
    architecture: [
      "Next.js App Router with app and frontend directory split",
      "TypeScript-first content structure",
    ],
    challenges: [],
    learnings: [],
    metrics: [
      { label: "Status", value: "Early development" },
    ],

    repoUrl: "https://github.com/BlazeDashX/Learning_Platform_frontend",
    images: [],
    date: "2025-02",
  },

  // ─────────────────────────────────────────────
  // 11. lifeChorono (WIP — Monorepo)
  // ─────────────────────────────────────────────
  {
    slug: "lifechorono",
    title: "lifeChorono",
    description:
      "Personal life-tracking or timeline app in early development — TypeScript monorepo with shared types across apps and packages.",
    techStack: ["Next.js", "TypeScript"],
    tags: ["personal"],
    href: "/projects/lifechorono",

    problem:
      "Building a monorepo-structured personal productivity or timeline tracking tool with shared types across frontend and future packages.",
    solution:
      "Set up a Turborepo-style monorepo with a shared packages/types layer and an apps directory for the frontend — early scaffolding for a timeline or habit tracking tool.",
    features: [
      "Monorepo structure with shared types package",
      "Apps directory for modular frontend development",
      "TypeScript-first throughout",
    ],

    role: "Full-Stack Developer",
    team: "Solo",
    duration: "In progress",
    category: "Personal Tool / WIP",
    objectives: [
      "Learn monorepo architecture with shared package types",
      "Build a personal life-tracking tool with a scalable structure",
    ],
    architecture: [
      "Monorepo with apps/ and packages/types split",
      "TypeScript shared types consumed across packages",
    ],
    challenges: [],
    learnings: [],
    metrics: [
      { label: "Status", value: "Early development" },
      { label: "Architecture", value: "Monorepo" },
    ],

    repoUrl: "https://github.com/BlazeDashX/lifeChorono",
    images: [],
    date: "2025-01",
  },
];

ProjectsSchema.parse(projects);