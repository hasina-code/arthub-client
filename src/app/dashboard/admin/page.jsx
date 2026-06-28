"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import OverviewCards from "@/components/dashboard/admin/OverviewCards";
import { SalesChart } from "@/components/dashboard/admin/SalesChart";
import { CategoryPieChart } from "@/components/dashboard/admin/CategoryPieChart";



export default function AdminDashboardPage() {
const { data: session } =
authClient.useSession();

const [analytics, setAnalytics] =
useState({});

const [salesData, setSalesData] =
useState([]);

const [categoryData, setCategoryData] =
useState([]);

useEffect(() => {
if (session) {
fetchData();
}
}, [session]);

const fetchData = async () => {
const token =
session?.session?.token ||
session?.token;


const analyticsRes = await axios.get(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/analytics`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const chartRes = await axios.get(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/chart-data`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setAnalytics(analyticsRes.data);
setSalesData(chartRes.data.salesData);
setCategoryData(chartRes.data.categoryData);


};

return ( <section className="space-y-8 text-white"> <h1 className="text-4xl font-bold">
Admin Overview </h1>


  <OverviewCards analytics={analytics} />

  <div className="grid lg:grid-cols-2 gap-6">
    <SalesChart data={salesData} />
    <CategoryPieChart data={categoryData} />
  </div>
</section>


);
}
