import "./globals.css";
import type { Metadata } from "next";
import BootLoader from "@/components/BootLoader";
import CursorGlow from "@/components/CursorGlow";
import ParticlesMesh from "@/components/ParticlesMesh";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refat | Portfolio",
  description: "Projects, Research, Certificates — by Refat",
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
      </body>
    </html>
  );
}