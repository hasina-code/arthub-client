export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center gap-5 bg-[#0b0e17]">

      {/* glowing spinner */}
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-4 border-white/10"></div>

        <div className="absolute top-0 left-0 h-14 w-14 rounded-full border-4 border-transparent border-t-pink-500 border-r-violet-500 animate-spin"></div>
      </div>

      {/* text */}
      <p className="text-gray-300 font-medium tracking-wide animate-pulse">
        Loading ArtHub gallery...
      </p>

      {/* subtle dots loader */}
      <div className="flex gap-1 mt-2">
        <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></span>
      </div>

    </div>
  );
}