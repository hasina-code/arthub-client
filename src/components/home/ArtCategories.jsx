import Link from "next/link";
import { Palette, Laptop, Diamond, CircleDashed } from "lucide-react";

const categories = [
  { name: "Painting", icon: <Palette size={32} />, description: "Oil & Watercolors", href: "/artworks?category=painting" },
  { name: "Digital", icon: <Laptop size={32} />, description: "3D & Illustration", href: "/artworks?category=digital" },
  { name: "Sculpture", icon: <Diamond size={32} />, description: "Clay & Wire frame", href: "/artworks?category=sculpture" },
  { name: "Abstract", icon: <CircleDashed size={32} />, description: "Mixed Media", href: "/artworks?category=abstract" }, 
];

export default function ArtCategories() {
  return (
    <section className="py-20 bg-[#050B23] text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Art Categories</h2>
        <p className="text-slate-400 mb-12">
          Filter through our diverse creative collections of physical and digital products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className="flex flex-col items-center justify-center p-8 bg-[#0B1437]/50 border border-slate-800 rounded-2xl hover:border-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 group"
            >
              <div className="mb-4 text-pink-400 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-xl font-semibold">{cat.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}