"use client";

import clsx from "clsx";

type Tone =
  | "neutral"
  | "university"
  | "industry"
  | "success"
  | "warning";

export default function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  const toneStyles: Record<Tone, string> = {
    neutral:
      "bg-white/5 text-white/70 border-white/10",

    university:
      "bg-blue-500/10 text-blue-400 border-blue-400/20",

    industry:
      "bg-purple-500/10 text-purple-400 border-purple-400/20",

    success:
      "bg-emerald-500/10 text-emerald-400 border-emerald-400/20",

    warning:
      "bg-amber-500/10 text-amber-400 border-amber-400/20",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border backdrop-blur",
        toneStyles[tone]
      )}
    >
      {children}
    </span>
  );
}