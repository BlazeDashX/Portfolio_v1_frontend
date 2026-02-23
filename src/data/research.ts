export interface Research {
  title: string;
  slug: string;
  summary: string;
  domain: string;
  method: string;
  status: "In Progress" | "Published";
  links: { label: string, url: string }[];
  date: string;
}

export const research: Research[] = [
  {
    title: "CNN-based Bengali Handwritten Digit Recognition",
    slug: "bengali-digit-recognition",
    summary: "Improving accuracy on noisy datasets using custom augmentation.",
    domain: "Computer Vision",
    method: "Convolutional Neural Networks",
    status: "Published",
    links: [{ label: "Paper", url: "#" }, { label: "GitHub", url: "#" }],
    date: "2023-08"
  },
  {
    title: "Object Detection in Low Light Environments",
    slug: "low-light-detection",
    summary: "Developing a lightweight YOLO variant for nighttime surveillance.",
    domain: "CV/ML",
    method: "YOLOv8 + Image Enhancement",
    status: "In Progress",
    links: [{ label: "GitHub", url: "#" }],
    date: "2024-02"
  },
  {
    title: "NLP for Sentiment Analysis in Local Dialects",
    slug: "nlp-dialects",
    summary: "Analyzing social media comments in non-standard Bengali.",
    domain: "NLP",
    method: "Transformer-based models",
    status: "In Progress",
    links: [],
    date: "2024-02"
  }
];