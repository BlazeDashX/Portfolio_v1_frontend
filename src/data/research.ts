import type { ResearchItem } from "@/types/content";

export const research: ResearchItem[] = [
  {
    title: "CNN-based Bengali Handwritten Digit Recognition",
    description:
      "Improving accuracy on noisy datasets using custom augmentation.",
    domain: "Computer Vision",
    status: "Published",
    tags: ["Computer Vision", "CNN"],
    paperUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Object Detection in Low Light Environments",
    description:
      "Developing a lightweight YOLO variant for nighttime surveillance.",
    domain: "CV/ML",
    status: "In Progress",
    tags: ["YOLOv8", "Image Enhancement"],
    githubUrl: "#",
  },
  {
    title: "NLP for Sentiment Analysis in Local Dialects",
    description:
      "Analyzing social media comments in non-standard Bengali.",
    domain: "NLP",
    status: "In Progress",
    tags: ["Transformers", "Bangla"],
  },
];