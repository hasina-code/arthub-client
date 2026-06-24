"use client";

import { Palette } from "lucide-react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes("dashboard")) return null;

  return (
    <footer className="bg-[#0b0e17] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-72 h-72 bg-pink-600/20 blur-[120px] rounded-full top-10 left-10" />
      <div className="absolute w-72 h-72 bg-violet-600/20 blur-[120px] rounded-full bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 relative z-10">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Palette className="w-8 h-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">ArtHub</span>
          </Link>

          <p className="text-gray-400 text-sm leading-relaxed">
            Discover, share and collect extraordinary digital artworks from creators around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-pink-400 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-pink-400 transition">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-pink-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-pink-500 transition">
              <FaInstagram className="text-white" />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-pink-500 transition">
              <FaTwitter className="text-white" />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-pink-500 transition">
              <FaFacebook className="text-white" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-3">
            Get updates about new artworks & featured artists.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-pink-500"
            />

            <button className="bg-gradient-to-r from-pink-600 to-violet-600 text-white rounded-full py-2 text-sm font-semibold hover:scale-105 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-6 text-center relative z-10">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ArtHub. All rights reserved.
        </p>
      </div>

    </footer>
  );
}