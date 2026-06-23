import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import SidebarContent from "./SidebarContent";
import MobileSidebar from "./MobileSidebar";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role || "buyer";

  const dashboardItems = {
    artist: [
      { icon: "ChartArea", label: "Overview", link: "/dashboard/artist" },
      { icon: "TbAsset", label: "Manage Artworks", link: "/dashboard/artist/artworks" },
      { icon: "BiMoney", label: "Sales History", link: "/dashboard/artist/sales" },
      { icon: "User2", label: "Profile", link: "/dashboard/artist/profile" },
    ],
    buyer: [
      { icon: "LayoutDashboard", label: "Overview", link: "/dashboard/buyer" },
      { icon: "TbAsset", label: "Bought Artworks", link: "/dashboard/buyer/products" },
      { icon: "BiMoney", label: "Purchase History", link: "/dashboard/buyer/transaction" },
      { icon: "MdPalette", label: "Subscription", link: "/dashboard/buyer/subscription" },
      { icon: "User2", label: "Profile", link: "/dashboard/buyer/profile" },
    ],
    admin: [
      { icon: "LayoutDashboard", label: "Admin Overview", link: "/dashboard/admin" },
      { icon: "User2", label: "Manage Users", link: "/dashboard/admin/users" },
      { icon: "TbAsset", label: "All Artworks", link: "/dashboard/admin/artworks" },
      { icon: "BiMoney", label: "Transactions", link: "/dashboard/admin/transactions" },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.buyer;

  return (
    <>
      {/* DESKTOP */}
      {/* <aside className="hidden md:block w-[260px] h-screen border-r border-gray-800"> */}
        <SidebarContent navItems={navItems} />
      </aside>

      {/* MOBILE */}
      <MobileSidebar navItems={navItems} />
    </>
  );
}