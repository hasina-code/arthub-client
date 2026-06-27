"use client";

import Link from "next/link";
import {
  CheckCircle,
  Home,
  ImageIcon,
  X,
} from "lucide-react";

export default function PaymentSuccessModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">

      <div className="relative w-full max-w-xl rounded-[32px] border border-slate-700 bg-[#09122E] p-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle
            size={90}
            className="text-green-500"
          />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-4xl font-bold text-white">
          Payment Successful
        </h1>

        {/* Message */}
        <p className="mt-4 text-center text-slate-400">
          Thank you for your purchase.
          <br />
          Your artwork has been added to your collection.
        </p>
      </div>
    </div>
  );
}