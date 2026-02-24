export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/7 ${className}`}
    >
      {children}
    </div>
  );
}