"use client";

import { useMemo, useState } from "react";
import { certificates } from "@/data";
import CertificateCard from "@/components/certificates/CertificateCard";
import CertificateFilters from "@/components/certificates/CertificateFilters";

export default function CertificatesPage() {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const issuers = useMemo(() => {
    return Array.from(new Set(certificates.map((c) => c.issuer))).sort();
  }, []);

  const years = useMemo(() => {
    return Array.from(
      new Set(
        certificates
          .map((c) => c.date?.split("-")[0])
          .filter(Boolean) as string[]
      )
    ).sort((a, b) => Number(b) - Number(a));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return certificates.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        (c.skills || []).some((s) => s.toLowerCase().includes(q));

      const matchesIssuer = !issuer || c.issuer === issuer;
      const matchesYear = !year || (c.date?.startsWith(year) ?? false);

      return matchesQuery && matchesIssuer && matchesYear;
    });
  }, [query, issuer, year]);

  function reset() {
    setQuery("");
    setIssuer(null);
    setYear(null);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Certificates</h1>
        <p className="opacity-80">
          Verified certifications, courses, and learning milestones.
        </p>
      </header>

      <CertificateFilters
        query={query}
        setQuery={setQuery}
        issuer={issuer}
        setIssuer={setIssuer}
        year={year}
        setYear={setYear}
        issuers={issuers}
        years={years}
        onReset={reset}
      />

      <section className="grid gap-5 md:grid-cols-2">
        {filtered.map((cert) => (
          <CertificateCard key={`${cert.title}-${cert.date}`} cert={cert} />
        ))}
      </section>

      {!filtered.length ? (
        <p className="opacity-70">No certificates match your filters.</p>
      ) : null}
    </main>
  );
}