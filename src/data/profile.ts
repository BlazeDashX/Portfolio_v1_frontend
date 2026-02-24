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
};