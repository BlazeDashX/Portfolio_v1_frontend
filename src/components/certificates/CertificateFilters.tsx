"use client";

export default function CertificateFilters({
    query, setQuery,
    issuer, setIssuer,
    year, setYear,
    issuers, years,
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
    const pillBase = "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer";
    const pillActive = "text-[color:var(--bg)] border-transparent";
    const pillInactive = "border-soft text-muted hover:border-[var(--accent)] hover:text-[color:var(--accent)]";

    return (
        <div className="rounded-2xl border border-soft bg-card p-5 space-y-5">
            {/* Search row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search certificates..."
                    className="w-full sm:max-w-md rounded-lg border border-soft bg-transparent px-4 py-2 text-sm text-main outline-none placeholder:text-muted focus:border-(--accent)"
                />
                <button
                    onClick={onReset}
                    className="rounded-lg border border-soft px-4 py-2 text-sm text-muted hover:border-(--accent) hover:text-(--accent) transition-all"
                >
                    Reset
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {/* Issuer */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">Issuer</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setIssuer(null)}
                            className={`${pillBase} ${issuer === null ? pillActive : pillInactive}`}
                            style={issuer === null ? { background: "var(--accent)" } : {}}
                        >
                            All
                        </button>
                        {issuers.map((x) => (
                            <button
                                key={x}
                                onClick={() => setIssuer(x)}
                                className={`${pillBase} ${issuer === x ? pillActive : pillInactive}`}
                                style={issuer === x ? { background: "var(--accent)" } : {}}
                            >
                                {x}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Year */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">Year</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setYear(null)}
                            className={`${pillBase} ${year === null ? pillActive : pillInactive}`}
                            style={year === null ? { background: "var(--accent)" } : {}}
                        >
                            All
                        </button>
                        {years.map((y) => (
                            <button
                                key={y}
                                onClick={() => setYear(y)}
                                className={`${pillBase} ${year === y ? pillActive : pillInactive}`}
                                style={year === y ? { background: "var(--accent)" } : {}}
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