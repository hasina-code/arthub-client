"use client";

import { useState } from "react";
import { Bars } from "@gravity-ui/icons";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar({ navItems }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">

      {/* BUTTON */}
      <div className="p-4">
        <button
          // onClick={() => setOpen(true)}
          // className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md"
        >
          <Bars />
          Menu
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 flex">

          {/* BACKDROP */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* SIDEBAR */}
          <div className="w-[260px] bg-[#0b0e17] h-full">
            <SidebarContent
              navItems={navItems}
              onNavigate={() => setOpen(false)}
            />
          </div>

        </div>
      )}

    </div>
  );
}