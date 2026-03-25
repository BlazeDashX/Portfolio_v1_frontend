import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <p className="mt-3 opacity-80">
        The project link is invalid or the project was removed.
      </p>
      <div className="mt-8">
        <Link href="/projects" className="rounded-lg border px-4 py-2">
          Back to Projects
        </Link>
      </div>
    </main>
  );
}