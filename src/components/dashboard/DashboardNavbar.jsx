"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { Bell, Search } from "lucide-react";

export default function DashboardNavbar() {
  const { data: session } = authClient.useSession();
  

  return (
    <div className="h-16 border-b border-white/10 b flex items-center justify-between px-6">
      
      {/* Left */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 border rounded-lg px-3 py-2">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent"
          />
        </div>

        {/* Notification */}
        <button className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-pink-500" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar
            src={user?.image}
            name={user?.name}
            size="sm"
          />

          <div className="hidden md:block">
            <p className="text-sm font-semibold">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}