import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import type { Metadata } from "next";
import BootLoader from "@/components/BootLoader";
import CursorGlow from "@/components/CursorGlow";
import ParticlesMesh from "@/components/ParticlesMesh";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  metadataBase: new URL("https://refatmdlabbi.vercel.app"),

  title: {
    default: "Refat | CSE Student • Web Dev • CV/ML Learner",
    template: "%s | Refat",
  },

  description:
    "Portfolio of Refat — CSE student building production-grade web systems and exploring computer vision & deep learning.",

  keywords: [
    "Refat",
    "CSE student",
    "Next.js developer",
    "Computer Vision",
    "Machine Learning",
    "Portfolio",
  ],

  authors: [{ name: "Refat" }],

  openGraph: {
  title: "Refat — Developer Portfolio",
  description:
    "Production-style web systems + CV/ML research exploration.",
  url: "https://refatmdlabbi.vercel.app",
  siteName: "Refat Portfolio",
  locale: "en_US",
  type: "website",
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
    },
  ],
},

  twitter: {
  card: "summary_large_image",
  title: "Refat — Developer Portfolio",
  description:
    "Web systems, research projects, and technical depth.",
  images: ["/opengraph-image"],
},

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-graphite text-white antialiased min-h-screen">
        <BootLoader />
        <CursorGlow />
        <ParticlesMesh />

        {/* background layers */}
        <div className="fixed inset-0 -z-20 bg-(--bg)" />
        <div className="fixed inset-0 -z-20 noise-overlay opacity-35" />
        <div className="fixed inset-0 -z-20">
          <div className="absolute -top-44 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-(--amber)/12 blur-3xl" />
          <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-(--mint)/10 blur-3xl" />
        </div>

        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        <Footer />
        
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}