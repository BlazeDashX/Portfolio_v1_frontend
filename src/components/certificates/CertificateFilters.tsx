"use client";

export default function CertificateFilters({
  query,
  setQuery,
  issuer,
  setIssuer,
  year,
  setYear,
  issuers,
  years,
  onReset,
}: {
  query: string;
  setQuery: (v: string) => void;
  issuer: string | null;
  setIssuer: (v: string | null) => void;
  year: string | null;
  setYear: (v: string | null) => void;
  issuers: string[];
  years: string[];
  onReset: () => void;
}) {
  return (
    <div className="rounded-xl border p-5 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search certificates..."
          className="w-full sm:max-w-md rounded-lg border bg-transparent px-4 py-2 text-sm outline-none"
        />

        <button onClick={onReset} className="rounded-lg border px-4 py-2 text-sm">
          Reset
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-semibold">Issuer</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIssuer(null)}
              className={`rounded-full border px-3 py-1 text-xs ${
                issuer === null ? "opacity-100" : "opacity-70"
              }`}
            >
              All
            </button>
            {issuers.map((x) => (
              <button
                key={x}
                onClick={() => setIssuer(x)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  issuer === x ? "opacity-100" : "opacity-70"
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Year</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setYear(null)}
              className={`rounded-full border px-3 py-1 text-xs ${
                year === null ? "opacity-100" : "opacity-70"
              }`}
            >
              All
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  year === y ? "opacity-100" : "opacity-70"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}