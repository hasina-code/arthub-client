"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";


import AddArtworkModal from "@/components/dashboard/artist/AddArtworkModal";
import DeleteModal from "@/components/dashboard/DeleteModal";


export default function ManageArtworksPage() {
  const { data: session, isPending } = authClient.useSession();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchArtworks = async () => {
    if (!session?.user?.email) return;
    try {
      const token = session?.session?.token || session?.token;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artist/artworks/${session.user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArtworks(res.data);
    } catch (error) {
      toast.error("Failed to load artworks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchArtworks();
  }, [session]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const token = session?.session?.token || session?.token;
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/artworks/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtworks((prev) => prev.filter((art) => art._id !== deleteId));
      toast.success("Artwork deleted successfully");
      setDeleteId(null);
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending || loading) return (
    <div className="min-h-screen flex justify-center items-center bg-[#050B23]">
      <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
    </div>
  );

  return (
    <section className="min-h-screen p-4 md:p-8 bg-[#050B23] text-white">
      <div className="max-w-7xl mx-auto">
   
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent leading-relaxed">
              Manage Artworks
            </h1>
            <p className="text-slate-400 mt-2">Manage your uploaded artworks</p>
          </div>
          {/* Add Modal */}
          <AddArtworkModal onArtworkAdded={fetchArtworks} />
        </div>

      
        {artworks.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
            <ImageIcon className="mx-auto text-slate-600 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-slate-400">No Artworks Found</h3>
          </div>
        ) : (
          <>
           
            <div className="hidden md:block bg-[#09122E]/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#0D183B]/50 border-b border-slate-800">
                  <tr className="text-slate-400 text-sm uppercase tracking-wider">
                    <th className="p-6">Image</th>
                    <th className="p-6">Title</th>
                    <th className="p-6">Price</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artworks.map((art) => (
                    <tr key={art._id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition">
                      <td className="p-6"><img src={art.image} className="w-16 h-16 rounded-xl object-cover" /></td>
                      <td className="p-6 font-bold">{art.title}</td>
                      <td className="p-6 text-emerald-400">${art.price}</td>
                      <td className="p-6"><span className={`px-3 py-1 rounded-full text-xs ${art.status === "sold" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>{art.status}</span></td>
                      <td className="p-6 flex gap-3">
                        <Link href={`/dashboard/artist/edit/${art._id}`} className="p-2 bg-slate-800 rounded-lg text-yellow-400 hover:bg-yellow-500 hover:text-black transition"><Pencil size={18} /></Link>
                        <button onClick={() => setDeleteId(art._id)} className="p-2 bg-slate-800 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
            <div className="md:hidden space-y-4">
              {artworks.map((art) => (
                <div key={art._id} className="bg-[#09122E] p-4 rounded-2xl border border-slate-800 flex gap-4 items-center">
                  <img src={art.image} className="w-20 h-20 rounded-xl object-cover" />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{art.title}</h3>
                    <p className="text-emerald-400">${art.price}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] ${art.status === "sold" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>{art.status}</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Link href={`/dashboard/artist/edit/${art._id}`} className="p-2 bg-slate-800 rounded-lg text-yellow-400">
                    <Pencil size={16} /> 
                    </Link>
                    <button onClick={() => setDeleteId(art._id)} className="p-2 bg-slate-800 rounded-lg text-red-400"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

   
      <DeleteModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        loading={isDeleting} 
      />
    </section>
  );
}