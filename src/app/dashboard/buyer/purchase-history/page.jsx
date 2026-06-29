"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { Loader2, Receipt, Inbox, Calendar, DollarSign, User } from "lucide-react";
import { motion } from "framer-motion";

export default function PurchaseHistoryPage() {
  const { data: session, isPending } = authClient.useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) fetchHistory();
  }, [session]);

  const fetchHistory = async () => {
  try {
    setLoading(true);

    const token = session?.session?.token;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/purchase-history/${session.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHistory(res.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  if (loading || isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <section className="bg-[#050B23] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-pink-500/20 p-4 rounded-2xl">
          <Receipt className="text-pink-500 w-7 h-7" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">Purchase History</span></h2>
          <p className="text-slate-400">Your recent transaction records.</p>
        </div>
      </div>

      {history.length > 0 ? (
        <div className="overflow-x-auto">
    
          <table className="w-full text-left hidden md:table">
            <thead>
              <tr className="text-slate-400 border-b border-white/10">
                <th className="p-4 font-medium">Artwork</th>
                <th className="p-4 font-medium">Artist</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-white font-semibold flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.artworkTitle}
                  </td>
                  <td className="p-4 text-slate-300">{item.artistName}</td>
                  <td className="p-4 text-emerald-400 font-bold flex items-center gap-1">
                    <DollarSign size={14}/> {item.amount}
                  </td>
                  <td className="p-4 text-slate-400 text-sm">
                    {new Date(item.purchaseDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <div className="md:hidden flex flex-col gap-4">
            {history.map((item) => (
              <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#09122E] p-4 rounded-2xl border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.artworkTitle}</h3>
                  <span className="text-emerald-400 font-bold flex items-center"><DollarSign size={14}/>{item.amount}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
                  <div className="flex items-center gap-1"><User size={14}/> {item.artistName}</div>
                  <div className="flex items-center gap-1"><Calendar size={14}/> {new Date(item.purchaseDate).toLocaleDateString()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-16 text-center text-slate-500">
          <Inbox className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>No purchase history found.</p>
        </div>
      )}
    </section>
  );
}