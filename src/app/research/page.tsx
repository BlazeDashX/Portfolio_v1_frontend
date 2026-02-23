import React from "react";
import { Container } from "@/components/ui/Container";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="pt-24 pb-16">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-lg text-white/70 max-w-2xl">{subtitle}</p>
        )}
      </header>

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8">
        {children}
      </div>
    </Container>
  );
}