import Link from "next/link";

export default function SectionHeader({
  title,
  subtitle,
  actionHref,
  actionLabel,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle ? <p className="opacity-80">{subtitle}</p> : null}
      </div>

      {actionHref && actionLabel ? (
        <Link href={actionHref} className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4">
          {actionLabel} →
        </Link>
      ) : null}
    </div>
  );
}