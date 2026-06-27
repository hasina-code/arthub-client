"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const topArtists = [
  {
    id: 1,
    name: "Sophia Carter",
    role: "Abstract Visionary",
    avatar: "https://i.ibb.co/bMcZNfVr/images-12.jpg",
    banner:
      "https://i.ibb.co/0ys58DNK/claraundben-ai-generated-8371556-1920.jpg",
    sales: 14,
  },
  {
    id: 2,
    name: "Ethan Walker",
    role: "Digital Concept Artist",
    avatar: "https://i.ibb.co/N2Lf3FkB/images-9.jpg",
    banner: "https://i.ibb.co/W4dfqvbr/Golden-Abstract.jpg",
    sales: 9,
  },
  {
    id: 3,
    name: "Olivia Stone",
    role: "Contemporary Sculptor",
    avatar: "https://i.ibb.co/qF0nRshN/images-11.jpg",
    banner: "https://i.ibb.co/ZzHpYfHL/Cyber-Future.jpg",
    sales: 6,
  },
];

export default function TopArtists() {
  return (
    <section className="py-24 bg-[#050B23] px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Top Selling  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">Artists</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the creative minds whose artworks inspire collectors
            around the world.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-[#111827] rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
            >
              {/* Banner */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={artist.banner}
                  alt={artist.name}
                  fill
                  className="object-cover transition duration-700 hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent" />
              </div>

              {/* Content */}
              <div className="px-6 pb-8 text-center">
                {/* Avatar */}
                <div className="relative -mt-12 mb-5 flex justify-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                    }}
                    className="relative h-24 w-24 rounded-full border-4 border-[#111827] overflow-hidden shadow-xl"
                  >
                    <Image
                      src={artist.avatar}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Rank Badge */}
                  <div className="absolute bottom-0 translate-x-10 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-lg">
                     #{index + 1}
                  </div>
                </div>

                {/* Artist Info */}
                <h3 className="text-2xl font-bold text-white">
                  {artist.name}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {artist.role}
                </p>

                {/* Sales Badge */}
                <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 py-3 rounded-xl backdrop-blur-sm">
                  <p className="text-pink-400 font-bold tracking-wide">
                    {artist.sales} Sales
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}