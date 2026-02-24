export default function ProjectGallery({
  title = "Screenshots",
  images = [],
}: {
  title?: string;
  images?: string[];
}) {
  if (!images.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src) => (
          <div key={src} className="overflow-hidden rounded-xl border">
            <img
              src={src}
              alt="Project screenshot"
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}