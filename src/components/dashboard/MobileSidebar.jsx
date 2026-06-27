"use client";
import { useState } from "react";
import { Bars } from "@gravity-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar({ navItems }) {
  const [open, setOpen] = useState(false);

  return (
    <>
   
      <button
        onClick={() => setOpen(true)}
        className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg transition"
      >
        <Bars size={24} />
      </button>

   
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60"
            />
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-[60] h-screen w-[260px] border-r border-gray-800 bg-[#0b0e17]"
            >
              <SidebarContent
                navItems={navItems}
                onNavigate={() => setOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}