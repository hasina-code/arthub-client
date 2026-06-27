export default function EmptyState() {
  return (
    <div className="bg-[#09122E] rounded-3xl py-20 text-center">
      <h3 className="text-3xl font-bold">
        No artworks found 😢
      </h3>

      <p className="text-slate-400 mt-3">
        Try changing filters.
      </p>
    </div>
  );
}