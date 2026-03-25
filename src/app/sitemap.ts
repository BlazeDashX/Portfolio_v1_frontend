import { projects } from "@/data";

export default function sitemap() {
  const base = "https://refatmdlabbi.vercel.app";

  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/research",
    "/certificates",
    "/contact",
    "/resume",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
  }));

  const projectRoutes = projects.map((p) => {
    // p.date is "YYYY-MM" → convert to a date
    const lastModified = p.date ? new Date(`${p.date}-01`) : now;

    return {
      url: `${base}/projects/${p.slug}`,
      lastModified,
    };
  });

  return [...staticRoutes, ...projectRoutes];
}