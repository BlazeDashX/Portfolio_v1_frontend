"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Profile = {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

type RepoStats = {
  totalStars: number;
  topLanguages: { name: string; count: number }[];
};

export default function GitHubStats() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [repoStats, setRepoStats] = useState<RepoStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch("/api/github/profile"),
          fetch("/api/github/repos"),
        ]);

        if (!pRes.ok || !rRes.ok) {
          throw new Error("GitHub API failed (rate limit or config).");
        }

        const p = await pRes.json();
        const r = await rRes.json();
        setProfile(p);
        setRepoStats(r);
      } catch (e: any) {
        setError(e.message || "Failed to load GitHub stats.");
      }
    }

    load();
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border p-5">
        <p className="font-semibold">GitHub Stats</p>
        <p className="mt-2 text-sm opacity-80">{error}</p>
      </div>
    );
  }

  if (!profile || !repoStats) {
    return (
      <div className="rounded-xl border p-5">
        <p className="font-semibold">GitHub Stats</p>
        <p className="mt-2 text-sm opacity-70">Loading...</p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border p-5">
      <div className="flex items-center gap-4">
        <Image
  src={profile.avatar_url}
  alt="GitHub avatar"
  width={48}
  height={48}
  className="h-12 w-12 rounded-full border"
  priority={false}
/>
        <div>
          <p className="text-lg font-semibold">{profile.name || profile.login}</p>
          <p className="text-sm opacity-70">@{profile.login}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm opacity-70">Repos</p>
          <p className="text-xl font-semibold">{profile.public_repos}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm opacity-70">Followers</p>
          <p className="text-xl font-semibold">{profile.followers}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm opacity-70">Stars</p>
          <p className="text-xl font-semibold">{repoStats.totalStars}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-semibold">Top Languages</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {repoStats.topLanguages.map((l) => (
            <span key={l.name} className="rounded-full border px-3 py-1 text-sm">
              {l.name} ({l.count})
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}