"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getFeaturedArtworks } from "@/lib/action/artworks";

export default function FeaturedArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const data = await getFeaturedArtworks();
      setArtworks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#050B23]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[450px] rounded-3xl bg-slate-800/50 animate-pulse border border-slate-700" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#050B23] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
       
<div className="flex flex-col mb-16 gap-6">
  
 
  <div className="text-center w-full">
    <span className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase text-pink-400 bg-slate-900 border border-slate-800 rounded-full">
      Featured Artworks
    </span>
  </div>

  <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
    <div className="space-y-4 flex-1">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-center md:text-left">
        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Artworks</span>
      </h2>
   
      <div className="w-24 h-1.5 bg-gradient-to-r  rounded-full mx-auto md:mx-0" />
    </div>

    <Link 
      href="/artworks" 
      className="hidden md:flex group items-center gap-2 text-white bg-white/5 hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 font-medium border border-white/10 hover:border-pink-500/50 w-fit shrink-0"
    >
      View All Artworks 
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
</div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="group bg-[#0B1437]/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10"
            >
              {/* Image Section */}
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1437] via-transparent to-transparent opacity-80" />
                
                <span className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg">
                  Available
                </span>
                <span className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">
                  {art.category}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-slate-400 text-xs mb-2 uppercase tracking-wider">
                  {new Date(art.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition">
                  {art.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {art.description}
                </p>

                {/* Footer Section */}
                <div className="border-t border-white/10 pt-5 mt-auto flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Artist</p>
                    <p className="text-white font-semibold">{art.artistName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Price</p>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                      ${art.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}