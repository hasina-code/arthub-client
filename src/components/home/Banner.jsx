"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/rRQY15RF/claraundben-ai-generated-8371556-1920.jpg",
    title: "Discover Original Digital Art",
    desc: "Explore extraordinary digital masterpieces created by talented artists around the world.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/tpwZbt7w/prawny-vintage-1722772-1920.jpg",
    title: "Classic Vintage Collection",
    desc: "Browse timeless artworks that blend tradition, culture, and creativity.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/JR5ryKWN/prawny-king-arthur-1719275-1920.jpg",
    title: "Majestic Artistic Creations",
    desc: "Discover breathtaking creations inspired by legends, fantasy, and imagination.",
  },
];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <div className="relative h-[90vh] overflow-hidden bg-black">

      {/* background glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/30 blur-[140px] rounded-full" />

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <img
            src={slides[index].image}
            className="w-full h-full object-cover scale-105"
            alt=""
          />

          {/* dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20">
        <div className="max-w-4xl">

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm"
          >
            🎨 Premium Art Gallery
          </motion.div>

          {/* title */}
          <motion.h1
            key={slides[index].title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl md:text-6xl font-extrabold leading-tight"
          >
            {slides[index].title}
          </motion.h1>

          {/* desc */}
          <motion.p
            key={slides[index].desc}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-200 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {slides[index].desc}
          </motion.p>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <button
              onClick={() => router.push("/artworks")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:scale-105 transition"
            >
              Browse Artworks
            </button>

            <button
              onClick={() => router.push("/about")}
              className="px-8 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white"
      >
        <ChevronRight size={28} />
      </button>

      {/* dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === index ? "bg-white w-6" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}