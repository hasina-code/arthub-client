export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="h-[370px] rounded-3xl bg-slate-800 animate-pulse"
        />
      ))}
    </div>
  );
}