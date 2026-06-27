import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }) {
 
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role || "buyer";


  const dashboardItems = {
    artist: [
      { icon: "ChartArea", label: "Overview", link: "/dashboard/artist" },
      { icon: "TbAsset", label: "Manage Artworks", link: "/dashboard/artist/manage-artworks" },
      { icon: "BiMoney", label: "Sales History", link: "/dashboard/artist/sales-history" },
      { icon: "User2", label: "Profile", link: "/dashboard/artist/profile" },
    ],
    buyer: [
      { icon: "LayoutDashboard", label: "Overview", link: "/dashboard/buyer" },
      { icon: "TbAsset", label: "Bought Artworks", link: "/dashboard/buyer/bought-artworks" },
      { icon: "BiMoney", label: "Purchase History", link: "/dashboard/buyer/purchase-history" },
      { icon: "MdPalette", label: "Subscription", link: "/dashboard/buyer/subscription" },
      { icon: "User2", label: "Profile", link: "/dashboard/buyer/profile" },
    ],
     admin: [
    {
      icon: "LayoutDashboard", label: "Overview", link: "/dashboard/admin",
    },
    {
      icon: "Users", label: "Manage Users", link: "/dashboard/admin/users",
    },
    {
      icon: "TbAsset", label: "Manage Artworks", link: "/dashboard/admin/artworks",
    },
    {
      icon: "BiMoney",label: "Transactions",link: "/dashboard/admin/transactions",
    },
    {
      icon: "User2", label: "Profile", link: "/dashboard/admin/profile",
    },
  ],
  };

  const navItems = dashboardItems[role] || dashboardItems.buyer;

  return (
    <div className="flex min-h-screen bg-[#0b0e17]">
     
      <div className="hidden md:block">
        <DashboardSidebar navItems={navItems} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
 
        <DashboardNavbar navItems={navItems} />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}