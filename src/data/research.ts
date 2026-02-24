import type { ResearchItem } from "@/types/content";

export const research: ResearchItem[] = [
  {
    slug: "dcas-small-object-detection",
    title: "Dynamic Context-Aware Aggregation Strategy for Small Object Detection",
    abstract:
      "Proposes a dynamic context-aware aggregation strategy to improve small object detection under occlusion and scale variation using adaptive receptive fields and feature fusion.",
    domain: "Object Detection",
    status: "Draft",
    tags: ["small-object", "feature-fusion", "attention", "YOLO"],

    venue: "Preprint",
    year: 2026,

    datasets: ["VisDrone", "BDD100K", "TT100K"],
    methods: ["Multi-scale fusion", "Context-aware aggregation", "Attention mechanism"],
    metrics: [{ label: "mAP", value: "TBD" }],

    paperUrl: "",
    githubUrl: "",
  },

  {
    slug: "aqi-from-images",
    title: "Air Quality Index Estimation from Images using CNNs",
    abstract:
      "Predicts AQI (PM10) from environmental images using CNN backbones (ResNet-50 / MobileNet) as a low-cost alternative to sensor-based monitoring.",
    domain: "Image Regression",
    status: "In Progress",
    tags: ["AQI", "CNN", "regression", "ResNet", "MobileNet"],

    venue: "University Work",
    year: 2026,

    datasets: ["Beijing AQI Image Dataset (291 labeled images)"],
    methods: ["ResNet-50", "MobileNet", "image-based AQI regression"],
    metrics: [{ label: "Accuracy", value: "86.8% (ResNet-50)" }],

    paperUrl: "",
    githubUrl: "",
  },
];