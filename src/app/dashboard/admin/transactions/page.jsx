"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function TransactionsPage() {
const { data: session } =
authClient.useSession();

const [transactions, setTransactions] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {
if (session) {
fetchTransactions();
}
}, [session]);

const fetchTransactions = async () => {
try {
const token =
session?.session?.token ||
session?.token;


  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setTransactions(res.data);
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}


};

if (loading) {
return ( <div className="min-h-screen flex justify-center items-center"> <Loader2 className="w-10 h-10 animate-spin text-pink-500" /> </div>
);
}

return ( <section className="text-white"> <h1 className="text-4xl font-bold mb-8">
All Transactions </h1>


  <div className="bg-[#09122E] rounded-3xl overflow-hidden border border-slate-800">

    <table className="w-full">

      <thead className="bg-[#0D183B]">
        <tr>
          <th className="p-5 text-left">Transaction ID</th>
          <th className="p-5 text-left">Type</th>
          <th className="p-5 text-left">Email</th>
          <th className="p-5 text-left">Amount</th>
          <th className="p-5 text-left">Date</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((item) => (
          <tr
            key={item._id}
            className="border-t border-slate-800"
          >
            <td className="p-5">
              {item.transactionId || item.sessionId}
            </td>

            <td className="p-5 capitalize">
              {item.type || "subscription"}
            </td>

            <td className="p-5">
              {item.buyerEmail ||
                item.userEmail ||
                item.artistEmail}
            </td>

            <td className="p-5">
              ${item.amount || 0}
            </td>

            <td className="p-5">
              {new Date(
                item.purchaseDate ||
                item.createdAt
              ).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</section>


);
}
