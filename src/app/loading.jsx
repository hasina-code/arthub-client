export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600"></div>
      <p className="text-slate-500 font-medium animate-pulse">Loading data from ArtHub...</p>
    </div>
  );
}