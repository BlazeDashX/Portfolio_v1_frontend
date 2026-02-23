"use client";

import PageShell from "@/components/PageShell";
import { CertificateCard } from "@/components/CertificateCard";
import { certificates } from "@/data/certificates";

export default function CertificatesPage() {
  return (
    <PageShell
      title="Certificates"
      subtitle="Verified learning milestones and professional training."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c) => (
          <CertificateCard key={c.id ?? c.title} certificate={c} />
        ))}
      </div>
    </PageShell>
  );
}