"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const topArtists = [
  {
    id: 1,
    name: "Sophia Carter",
    category: "Abstract Painter",
    avatar: "https://i.ibb.co/bMcZNfVr/images-12.jpg",
    banner:
      "https://i.ibb.co/0ys58DNK/claraundben-ai-generated-8371556-1920.jpg",
    sales: 14,
  },
  {
    id: 2,
    name: "Ethan Walker",
    category: "Digital Illustrator",
    avatar: "https://i.ibb.co/N2Lf3FkB/images-9.jpg",
    banner: "https://i.ibb.co/W4dfqvbr/Golden-Abstract.jpg",
    sales: 9,
  },
  // {
  //   id: 3,
  //   name: "Olivia Stone",
  //   category: "Sculpture Artist",
  //   avatar: "https://i.ibb.co/qF0nRshN/images-11.jpg",
  //   banner: "https://i.ibb.co/ZzHpYfHL/Cyber-Future.jpg",
  //   sales: 6,
  // },
];

export default function TopArtists() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-5xl font-bold">
          Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Artists</span>
        </h2>

        <p className="text-gray-400 mt-3">
          Meet the artists leading the marketplace.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topArtists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl"
          >
            {/* Banner */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={artist.banner}
                alt={artist.name}
                fill
                className="object-cover hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
            </div>

            {/* Avatar */}
            <div className="relative flex justify-center -mt-14 z-10">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-slate-900 shadow-lg"
              >
                <Image
                  src={artist.avatar}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="text-center px-6 pb-8 pt-4">
              <h3 className="text-2xl font-bold text-white">
                {artist.name}
              </h3>

              <p className="text-cyan-400 mt-2">
                {artist.category}
              </p>

              <div className="mt-5 inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <span className="text-cyan-300 font-semibold">
                  {artist.sales} Sales
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}