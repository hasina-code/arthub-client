export default function SkeletonCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-4 animate-pulse h-[350px] border border-slate-800">
      <div className="h-48 bg-slate-800 rounded-xl mb-4" />
      <div className="h-6 bg-slate-800 rounded w-3/4 mb-2" />
      <div className="h-4 bg-slate-800 rounded w-1/2" />
    </div>
  );
}