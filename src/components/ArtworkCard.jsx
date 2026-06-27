import Image from "next/image";
import Link from "next/link";

export default function ArtworkCard({ art }) {
  return (
    <Link
      href={`/artworks/${art._id}`}
      className="group relative bg-[#0B1437] rounded-3xl overflow-hidden border border-white/10 hover:border-pink-500 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20"
    >
    
      <div className="relative h-64 overflow-hidden">
        <Image
          src={art.image}
          alt={art.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized
        />
      
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-xs font-medium text-emerald-400">
          {art.status || "Available"}
        </div>
      </div>

     
      <div className="p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
          {art.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1 mb-4">by {art.artistName}</p>

     
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-lg font-bold">${art.price}</span>
          <span className="text-sm font-semibold text-white flex items-center gap-1 group-hover:gap-2 transition-all">
            <span className="text-pink-500">Details →</span>
          </span>
        </div>
      </div>
    </Link>
  );
}