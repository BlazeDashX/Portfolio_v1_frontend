import Link from "next/link";

export default function PrimaryCTA({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "outline";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150";

  const isExternal = href.startsWith("http");

  const solidStyle = {
    background: "var(--accent)",
    color: "var(--bg)",
    boxShadow: "0 0 16px color-mix(in srgb, var(--accent) 28%, transparent)",
  };

  const outlineClass = "border border-soft bg-transparent text-main hover:border-(--accent) hover:text-(--accent)";

  const className = `${base} ${variant === "outline" ? outlineClass : ""}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={variant === "primary" ? solidStyle : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={variant === "primary" ? solidStyle : undefined}
    >
      {label}
    </Link>
  );
}