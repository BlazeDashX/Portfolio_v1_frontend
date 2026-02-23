export default function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "university" | "industry";
}) {
  const map = {
    neutral: "border-white/15 bg-white/5 text-white/85",
    university: "border-[var(--amber)]/40 bg-[var(--amber)]/10 text-[var(--amber)]",
    industry: "border-[var(--mint)]/40 bg-[var(--mint)]/10 text-[var(--mint)]",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${map[tone]}`}>
      {children}
    </span>
  );
}