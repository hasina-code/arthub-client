"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { Bell } from "lucide-react";
import MobileSidebar from "./MobileSidebar"; 

export default function DashboardNavbar({ navItems }) {
  const { data: session } = authClient.useSession();
  
  return (
    <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-[#0b0e17] text-white sticky top-0 z-40">
      
   
      <div className="flex items-center gap-4">
    
        <div className="md:hidden">
          <MobileSidebar navItems={navItems} />
        </div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      
      <div className="flex items-center gap-4">
        <Bell size={20} />
        <Avatar name={session?.user?.name} size="sm" />
      </div>
    </div>
  );
}