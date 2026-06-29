"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconMap } from "./iconMap";


export default function SidebarContent({ navItems, onNavigate }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full bg-[#0b0e17] text-white p-4">

      {/* LOGO */}
      <div className="mb-8 px-3">
        <Link href="/" onClick={onNavigate} >
        <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">ArtHub</span>
        </Link>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <Link
              key={item.label}
              href={item.link}
              onClick={onNavigate}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all
                ${
                  pathname === item.link
                    ? "bg-pink-600 text-white"
                    : "text-gray-300 hover:bg-pink-600 hover:text-white"
                }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              {item.label}
            </Link>
          );
        })}
      </div>

    </nav>
  );
}