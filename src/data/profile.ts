import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Refat",
  role: "CSE Student | Web Developer | CV/ML Learner",
  location: "Bangladesh",
  email: "refat00021@gmail.com",
  github: "https://github.com/BlazeDashX",
  linkedin: "https://linkedin.com/in/refatlabbi",
  about:
    "I am a Computer Science student focused on building robust web applications and exploring the intersections of Computer Vision and Machine Learning.",
  highlights: [
    "CSE student (AIUB) — building production-style web apps",
    "Strong focus on clean architecture + maintainable code",
    "Exploring CV/ML research (object detection, segmentation)",
    "Comfortable with React/Next.js + backend APIs + databases",
  ],
  skills: {
    frontend: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express/NestJS", "PostgreSQL", "Redis"],
    tools: ["Git/GitHub", "Postman", "Linux", "Vercel"],
    research: ["PyTorch (learning)", "OpenCV", "Model optimization basics"],
  },
  stats: [
    { label: "Projects", value: "10+" },
    { label: "Certificates", value: "8+" },
    { label: "Research focus", value: "CV / Detection" },
  ],
  timeline: [
    {
      title: "B.Sc. in Computer Science",
      org: "American International University — Bangladesh (AIUB)",
      period: "2022 – Present",
      description: "Studying core CS fundamentals, algorithms, data structures, OS, databases, and software engineering. Active in programming clubs.",
      type: "education" as const,
    },
    {
      title: "CV/ML Research — Object Detection",
      org: "Independent / University Lab",
      period: "2024 – Present",
      description: "Exploring object detection pipelines, model optimization, and segmentation using PyTorch and OpenCV. Working towards first publication.",
      type: "research" as const,
    },
    {
      title: "Full-Stack Web Developer",
      org: "Freelance / Personal Projects",
      period: "2023 – Present",
      description: "Building production-style web apps with Next.js, TypeScript, PostgreSQL, and Redis. Focus on clean architecture and scalable APIs.",
      type: "work" as const,
    },
    {
      title: "Higher Secondary Certificate (HSC)",
      org: "Comilla Cadet College",
      period: "2020 – 2022",
      description: "Completed HSC with a focus on science. Developed strong analytical foundation and discipline.",
      type: "education" as const,
    },
  ],
};