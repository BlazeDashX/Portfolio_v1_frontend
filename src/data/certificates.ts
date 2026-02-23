export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skills: string[];
  image: string;
}

export const certificates: Certificate[] = [
  {
    title: "Meta Front-End Developer",
    issuer: "Coursera",
    date: "2023-05",
    credentialUrl: "#",
    skills: ["React", "UX"],
    image: "/cert1.jpg",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2023-08",
    credentialUrl: "#",
    skills: ["Python", "Supervised Learning"],
    image: "/cert2.jpg",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon",
    date: "2023-11",
    credentialUrl: "#",
    skills: ["Cloud", "Security"],
    image: "/cert3.jpg",
  },
  {
    title: "JavaScript Algorithms",
    issuer: "FreeCodeCamp",
    date: "2022-12",
    credentialUrl: "#",
    skills: ["Logic", "Data Structures"],
    image: "/cert4.jpg",
  },
  {
    title: "Docker for DevOps",
    issuer: "Udemy",
    date: "2024-01",
    credentialUrl: "#",
    skills: ["Docker", "CI/CD"],
    image: "/cert5.jpg",
  },
  {
    title: "Neural Networks & Deep Learning",
    issuer: "Coursera",
    date: "2023-06",
    credentialUrl: "#",
    skills: ["CNN", "Backpropagation"],
    image: "/cert6.jpg",
  },
];