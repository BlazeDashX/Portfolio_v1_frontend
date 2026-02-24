export default function Highlights({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="rounded-xl border p-5">
      <h2 className="text-lg font-semibold">Highlights</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 opacity-90">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}