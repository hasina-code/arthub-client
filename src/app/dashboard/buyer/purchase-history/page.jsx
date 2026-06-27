"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { Loader2, Receipt, Inbox } from "lucide-react";

export default function PurchaseHistoryPage() {
  const { data: session, isPending } = authClient.useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchHistory();
    }
  }, [session]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/purchase-history/${session.user.email}`
      );
      setHistory(res.data);
    } catch (error) {
      console.error(error);
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
    <div className="bg-[#050B23] border border-slate-800 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-pink-500/10 p-3 rounded-2xl">
          <Receipt className="text-pink-500 w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-white">Purchase History</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="p-4 font-medium">Artwork</th>
              <th className="p-4 font-medium">Artist</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Purchase Date</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-800">
            {history.length > 0 ? (
              history.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-white/5 transition-colors duration-200 group"
                >
                  <td className="p-4 text-white font-semibold flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-pink-500 hidden group-hover:block" />
                     {item.artworkTitle}
                  </td>
                  <td className="p-4 text-slate-300">{item.artistName}</td>
                  <td className="p-4 text-emerald-400 font-bold">${item.amount}</td>
                  <td className="p-4 text-slate-400 text-sm">
                    {new Date(item.purchaseDate).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-16 text-center text-slate-500">
                  <Inbox className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  No purchase history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}