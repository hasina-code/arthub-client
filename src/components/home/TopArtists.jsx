"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const topArtists = [
  {
    id: 1,
    name: "Sophia Carter",
    avatar: "https://i.ibb.co/bMcZNfVr/images-12.jpg",
    sales: 14,
    banner:
      "https://i.ibb.co/0ys58DNK/claraundben-ai-generated-8371556-1920.jpg",
  },
  {
    id: 2,
    name: "Ethan Walker",
    avatar: "https://i.ibb.co/N2Lf3FkB/images-9.jpg",
    sales: 9,
    banner: "https://i.ibb.co/W4dfqvbr/Golden-Abstract.jpg",
  },
  {
    id: 3,
    name: "Olivia Stone",
    avatar: "https://i.ibb.co/qF0nRshN/images-11.jpg",
    sales: 6,
    banner: "https://i.ibb.co/ZzHpYfHL/Cyber-Future.jpg",
  },
];

export default function TopArtists() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Top{" "}
          <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Artists
          </span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Meet the artists leading the marketplace with the highest sales.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topArtists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -12,
              scale: 1.03,
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/70 backdrop-blur-lg shadow-xl"
          >
            {/* Banner */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={artist.banner}
                alt={artist.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-[#0b0e17]/40 to-transparent" />
            </div>

            {/* Ranking Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-1 text-sm font-semibold text-white">
              <Award size={15} />
              #{index + 1}
            </div>

            {/* Avatar */}
            <div className="relative flex justify-center -mt-14 z-10">
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#0b0e17] shadow-2xl"
              >
                <Image
                  src={artist.avatar}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Artist Info */}
            <div className="px-6 pb-8 pt-5 text-center">
              <h3 className="text-2xl font-bold text-white">
                {artist.name}
              </h3>

              <div className="mt-5 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2">
                <span className="font-semibold text-cyan-300">
                  {artist.sales} Total Sales
                </span>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}