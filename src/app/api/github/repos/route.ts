import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    return NextResponse.json({ error: "Missing GITHUB_USERNAME" }, { status: 500 });
  }

  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: process.env.GITHUB_TOKEN ? `Bearer ${process.env.GITHUB_TOKEN}` : "",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub repos fetch failed" }, { status: res.status });
  }

  const repos = await res.json();

  const totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);

  const langCount: Record<string, number> = {};
  repos.forEach((r: any) => {
    const lang = r.language;
    if (!lang) return;
    langCount[lang] = (langCount[lang] || 0) + 1;
  });

  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    totalStars,
    topLanguages,
  });
}