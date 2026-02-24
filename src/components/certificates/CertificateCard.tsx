"use client";

import { useState } from "react";
import type { Certificate } from "@/types/content";
import Modal from "@/components/common/Modal";

export default function CertificateCard({ cert }: { cert: Certificate }) {
  const [open, setOpen] = useState(false);

  const year = cert.date?.split("-")[0] ?? "";

  return (
    <>
      <div className="rounded-xl border p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{cert.title}</h3>
            <p className="text-sm opacity-70">
              {cert.issuer} {year ? `• ${year}` : ""}
            </p>
          </div>

          <button onClick={() => setOpen(true)} className="rounded-lg border px-3 py-2 text-sm">
            Preview
          </button>
        </div>

        {/* Skills */}
        {cert.skills?.length ? (
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((s) => (
              <span key={s} className="rounded-full border px-3 py-1 text-xs opacity-90">
                {s}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Verify ↗
          </a>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={cert.title}>
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border">
            <img src={cert.image} alt={cert.title} className="h-auto w-full" />
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Verify Credential ↗
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}