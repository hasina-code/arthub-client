"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-[#0b0e17] relative overflow-hidden">

    
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-72 h-72 bg-pink-600/30 blur-[120px] rounded-full top-10 left-10"
      />

      <motion.div
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-72 h-72 bg-violet-600/30 blur-[120px] rounded-full bottom-10 right-10"
      />

   
      <motion.h1
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-[150px] font-black bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent tracking-tighter leading-none"
      >
        404
      </motion.h1>

      
      <motion.h2
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="text-4xl font-bold mt-2 text-white"
      >
        Masterpiece Not Found
      </motion.h2>

      
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-gray-400 mt-4 max-w-sm text-lg"
      >
        The artwork you are looking for has been moved to a private gallery or does not exist in our collection.
      </motion.p>

     
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="mt-8"
      >
        <Link href="/">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full px-8 py-6 text-lg transition-all shadow-[0_0_30px_rgba(219,39,119,0.5)] hover:scale-105">
            Back to Home
          </Button>
        </Link>
      </motion.div>

    </main>
  );
}