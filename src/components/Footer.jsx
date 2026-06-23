"use client"
import { Palette } from "lucide-react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {


 const pathname = usePathname()
  if(pathname.includes('dashboard')){
    return null;
  }


  return (
    <footer className="bg-[#0b0e17] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
     
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Palette className="w-8 h-8 text-pink-500" />
            <span className="text-2xl font-bold text-white">ArtHub</span>
          </Link>
          {/* <p className="text-gray-400 text-sm leading-relaxed">
            Connecting art lovers with talented creators worldwide. Discover your next masterpiece today.
          </p> */}
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-pink-500 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-pink-500 transition">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-pink-500 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-pink-500 transition">
              <FaInstagram size={18} className="text-white"/>
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-pink-500 transition">
              <FaTwitter size={18} className="text-white"/>
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-pink-500 transition">
              <FaFacebook size={18} className="text-white"/>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-pink-500"
            />
            <button className="bg-pink-600 text-white rounded-full py-2 text-sm font-semibold hover:bg-pink-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ArtHub. All rights reserved. Built with passion for digital art.
        </p>
      </div>
    </footer>
  );
}