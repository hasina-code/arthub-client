"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard, MdPalette } from "react-icons/md";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;


 const pathname = usePathname()
  if(pathname.includes('dashboard')){
    return null;
  }



  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {/* Top Marquee */}
      <div className="bg-black p-1 text-white text-sm">
        <marquee>
          🎉 Discover & Buy Original Art | 🎨 Verified Artists Worldwide | 🚚 Secure Delivery.
        </marquee>
      </div>

      <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b1329]  backdrop-blur-lg text-white">
        <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
            <Link href={'/'} className="flex items-center gap-2">
              <MdPalette className="w-10 h-10 text-cyan-400" />
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">ArtHub</span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block relative w-full max-w-xs mx-6">
            <input 
              type="text" 
              placeholder="Search artworks..." 
              className="w-full bg-transparent border border-pink-500/50 rounded-full py-2 px-5 text-sm focus:outline-none focus:border-pink-500 transition-all"
            />
            <Search className="absolute right-4 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Nav Links */}
          <ul className="hidden items-center gap-6 md:flex">
            <li><Link href="/" className="hover:text-pink-400 transition-colors">Home</Link></li>
            <li><Link href="/browse" className="hover:text-pink-400 transition-colors">Browse Artworks</Link></li>
          </ul>

          {/* Auth Section */}
          {!user && (
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/signin" className="text-sm font-medium hover:text-pink-400">Sign In</Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 font-bold">Register</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-4">
              <Dropdown>
                <Dropdown.Trigger className="cursor-pointer">
  
      <div className="relative group">
    <img 
      src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=ec4899&color=fff`} 
      alt={user?.name || "User"} 
      className="w-10 h-10 rounded-full border-2 border-pink-500/50 object-cover transition-transform duration-200 group-hover:scale-105"
      referrerPolicy="no-referrer"
    />
    
    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0b1329] rounded-full"></span>
  </div>

                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <Dropdown.Menu>
                    <Dropdown.Item id="dashboard">
                      <Link href={`/dashboard/${user?.role}`} className="flex items-center gap-2">
                        <MdDashboard /> <Label>Dashboard</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="profile">
                      <CgProfile /> <Label>Profile</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" variant="danger" onClick={handleSignOut}>
                      <BiLogOut /> <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/10 p-4 md:hidden bg-[#0b0e17]">
            <ul className="flex flex-col gap-4">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/browse">Browse Artworks</Link></li>
              {!user && (
                <>
                  <li><Link href="/signin">Sign In</Link></li>
                  <li><Link href="/signup" className="text-pink-500 font-bold">Register</Link></li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;