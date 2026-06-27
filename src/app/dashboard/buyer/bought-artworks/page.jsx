"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Loader2, PackageSearch, ExternalLink } from "lucide-react";

export default function BoughtArtworksPage() {
  const { data: session, isPending } = authClient.useSession();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetchBoughtArtworks();
    }
  }, [session]);

  const fetchBoughtArtworks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/purchase-history/${session.user.email}`
      );
      setArtworks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load your artworks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (isPending || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] text-white">
        <Loader2 className="w-12 h-12 animate-spin text-pink-500 mb-4" />
        <p className="text-slate-400">Loading your collection...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050B23] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Bought Artworks
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            A curated list of masterpieces you've acquired.
          </p>
        </div>

        {error ? (
          <div className="text-center text-red-400 p-10 bg-[#09122E] rounded-3xl border border-red-900/30">
            {error}
          </div>
        ) : artworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#09122E] rounded-3xl border border-slate-800 shadow-xl">
            <PackageSearch className="w-20 h-20 text-slate-700 mb-6" />
            <h2 className="text-2xl font-bold">No Artworks Yet</h2>
            <p className="text-slate-400 mt-2 mb-8">Your collection is waiting to be started.</p>
            <Link
              href="/browse"
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 transition-all rounded-full font-semibold shadow-lg shadow-pink-900/20"
            >
              Explore Gallery
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((item) => (
              <div
                key={item._id}
                className="group bg-[#09122E] border border-slate-800 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={item.artworkImage}
                    alt={item.artworkTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09122E] to-transparent opacity-60" />
                </div>
                
                {/* <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 truncate">{item.artworkTitle}</h3>
                  <p className="text-slate-400 text-sm mb-4">Artist: {item.artistName}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-emerald-400 font-bold text-lg">${item.amount}</span>
                    <span className="text-slate-500 text-xs bg-white/5 px-2 py-1 rounded">
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </span>
                  </div> */}

                  <Link
                    href={`/artworks/${item.artworkId}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-slate-700 rounded-xl font-medium transition"
                  >
                    View Details <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}