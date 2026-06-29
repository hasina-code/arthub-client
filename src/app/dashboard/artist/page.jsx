"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Palette, ShoppingBag, DollarSign } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import OverviewChart from "@/components/OverviewChart";


export default function ArtistDashboardHomePage() {
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalArtworks: 0,
    soldArtworks: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchOverview();
    }
  }, [session]);

  const fetchOverview = async () => {
  try {
    const token =
      session?.session?.token ||
      session?.token;

    const artworksRes = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/artist/artworks/${session.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const salesRes = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/artist/sales/${session.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const artworks = artworksRes.data;
    const sales = salesRes.data;

    const soldArtworks = artworks.filter(
      (art) => art.status === "sold"
    ).length;

    const totalRevenue = sales.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    setStats({
      totalArtworks: artworks.length,
      soldArtworks,
      totalSales: sales.length,
      totalRevenue,
    });
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const chartData = [
    {
      name: "Artworks",
      value: stats.totalArtworks,
    },
    {
      name: "Sold",
      value: stats.soldArtworks,
    },
    {
      name: "Sales",
      value: stats.totalSales,
    },
    {
      name: "Revenue",
      value: stats.totalRevenue,
    },
  ];

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#050B23]">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050B23] text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">Artist Dashboard</span>
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back, {session?.user?.name}
          </p>
        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-[#09122E] rounded-3xl p-6 border border-slate-800">
            <Palette className="text-pink-500 mb-4" size={34} />

            <h3 className="text-slate-400">
              Total Artworks
            </h3>

            <h2 className="text-4xl font-bold mt-2">
              {stats.totalArtworks}
            </h2>
          </div>

          <div className="bg-[#09122E] rounded-3xl p-6 border border-slate-800">
            <ShoppingBag className="text-green-500 mb-4" size={34} />

            <h3 className="text-slate-400">
              Sold Artworks
            </h3>

            <h2 className="text-4xl font-bold mt-2">
              {stats.soldArtworks}
            </h2>
          </div>

          <div className="bg-[#09122E] rounded-3xl p-6 border border-slate-800">
            <ShoppingBag className="text-violet-500 mb-4" size={34} />

            <h3 className="text-slate-400">
              Total Sales
            </h3>

            <h2 className="text-4xl font-bold mt-2">
              {stats.totalSales}
            </h2>
          </div>

          <div className="bg-[#09122E] rounded-3xl p-6 border border-slate-800">
            <DollarSign className="text-yellow-500 mb-4" size={34} />

            <h3 className="text-slate-400">
              Total Revenue
            </h3>

            <h2 className="text-4xl font-bold mt-2">
              ${stats.totalRevenue}
            </h2>
          </div>

        </div>

        {/* Chart */}

        <OverviewChart data={chartData} />

      </div>
    </section>
  );
}