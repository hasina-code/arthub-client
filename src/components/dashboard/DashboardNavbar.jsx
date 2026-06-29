"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { MdPalette } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import MobileSidebar from "./MobileSidebar";

export default function DashboardNavbar({
  navItems,
}) {
  const { data: session } =
    authClient.useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-800 bg-[#0b0e17]/90 backdrop-blur">

      <div className="flex h-20 items-center justify-between px-4 md:px-8">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="md:hidden">
            <MobileSidebar navItems={navItems} />
          </div>

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <MdPalette className="w-10 h-10 text-pink-400" />

            <span className="hidden sm:block text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              ArtHub
            </span>
          </Link>

        </div>

        {/* Center */}
        <div className="hidden md:block">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
        {session?.user?.role === "admin" &&
        "Admin Dashboard"}

        {session?.user?.role === "artist" &&
        "Artist Dashboard"}

         {session?.user?.role === "buyer" &&
         "Buyer Dashboard"}
       </h1>
       </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <div className="hidden sm:flex items-center gap-3">

            <img
              src={
                session?.user?.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="w-11 h-11 rounded-full border-2 border-pink-500 object-cover"
            />

            <div>
              <h3 className="font-semibold text-white">
                {session?.user?.name}
              </h3>

              <p className="text-sm capitalize text-gray-400">
                {session?.user?.role}
              </p>
            </div>

          </div>

          <button
            onClick={() =>
              authClient.signOut()
            }
            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" />

            <span className="hidden md:block">
              Logout
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}