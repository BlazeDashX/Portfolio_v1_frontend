"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certificates } from "@/data";
import CertificateCard from "@/components/certificates/CertificateCard";
import CertificateFilters from "@/components/certificates/CertificateFilters";
import CertStats from "@/components/certificates/CertStats";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CertificatesPage() {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const issuers = useMemo(() =>
    Array.from(new Set(certificates.map((c) => c.issuer))).sort(), []);

  const years = useMemo(() =>
    Array.from(new Set(certificates.map((c) => c.date?.split("-")[0]).filter(Boolean) as string[]))
      .sort((a, b) => Number(b) - Number(a)), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certificates.filter((c) => {
      const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q) || (c.skills || []).some((s) => s.toLowerCase().includes(q));
      const matchesIssuer = !issuer || c.issuer === issuer;
      const matchesYear = !year || (c.date?.startsWith(year) ?? false);
      return matchesQuery && matchesIssuer && matchesYear;
    });
  }, [query, issuer, year]);

  return (
    <Container>
      <div className="space-y-8">

        {/* Header */}
        <AnimatedSection>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              Credentials
            </p>
            <h1 className="text-4xl font-bold text-main">Certificates</h1>
            <p className="text-muted">Verified certifications, courses, and learning milestones.</p>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={0.05}>
          <CertStats certs={certificates} />
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.08}>
          <CertificateFilters
            query={query} setQuery={setQuery}
            issuer={issuer} setIssuer={setIssuer}
            year={year} setYear={setYear}
            issuers={issuers} years={years}
            onReset={() => { setQuery(""); setIssuer(null); setYear(null); }}
          />
        </AnimatedSection>

        {/* Grid with AnimatePresence */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted">
              No certificates match your filters.
            </motion.p>
          ) : (
            <motion.div key="grid" layout className="grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((cert, i) => (
                  <motion.div
                    key={`${cert.title}-${cert.date}`}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <CertificateCard cert={cert} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Container>
  );
}