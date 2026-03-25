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
    backend: ["Node.js", "Express/NestJS", "PostgreSQL",],
    tools: ["Git/GitHub", "Postman", "Linux", "Vercel"],
    research: ["PyTorch (learning)",],
  },
  stats: [
    { label: "Projects", value: "10+" },
    { label: "Certificates", value: "1" },
    { label: "Research focus", value: "CV / Detection" },
  ],
  timeline: [
    {
      title: "B.Sc. in Computer Science",
      org: "American International University — Bangladesh (AIUB)",
      period: "2023 – Present",
      description: "Studying core CS fundamentals, algorithms, data structures, OS, databases, and software engineering. Active in programming clubs.",
      type: "education" as const,
    },
    {
      title: "CV/ML Research — Object Detection",
      org: "Independent",
      period: "2025 – Present",
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
      org: "Police Lines School And College, Rangpur",
      period: "2019 – 2021",
      description: "Completed HSC with a focus on science. Developed strong analytical foundation and discipline.",
      type: "education" as const,
    },
    {
      title: "Secondary School Certificate (SSC)",
      org: "Rangpur Zilla School",
      period: "2011 – 2019",
      description: "Completed secondary education with a strong academic foundation and discipline, focusing on core subjects and overall development.",
      type: "education" as const,
    },
  ],
};