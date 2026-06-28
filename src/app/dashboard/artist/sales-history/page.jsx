"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SalesHistoryPage() {
  const { data: session, isPending } =
    authClient.useSession();

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchSales();
    }
  }, [session]);

  const fetchSales = async () => {
    try {
      const token =
        session?.session?.token ||
        session?.token;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artist/sales/${session.user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <section className="min-h-screen p-6 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Sales History
        </h1>

        <p className="text-slate-400 mt-2">
          Your sold artworks history
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#09122E]">

        <table className="w-full text-left">

          <thead className="bg-[#0D183B]">
            {/* <tr>
              <th className="p-5">Artwork</th>
              <th className="p-5">Buyer</th>
              <th className="p-5">Date</th>
              <th className="p-5">Amount</th>
            </tr> */}
          </thead>

          <tbody>

            {sales.map((sale) => (
              <tr
                key={sale._id}
                className="border-t border-slate-800"
              >
                <td className="p-5">
                  {sale.artworkTitle}
                </td>

                <td className="p-5">
                  {sale.buyerName}
                </td>

                <td className="p-5">
                  {new Date(
                    sale.purchaseDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-5 text-emerald-400">
                  ${sale.amount}
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </section>
  );
}