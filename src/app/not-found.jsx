import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-[#0b0e17]">
      
      <h1 className="text-[150px] font-black bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent tracking-tighter leading-none">
        404
      </h1>
      
      <h2 className="text-4xl font-bold mt-2 text-white">Masterpiece Not Found</h2>
      
      <p className="text-gray-400 mt-4 max-w-sm text-lg">
        The artwork you are looking for has been moved to a private gallery or does not exist in our collection.
      </p>

    
      <Link href="/" className="mt-8">
        <Button 
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full px-8 py-6 text-lg transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)]"
        >
          Return to Gallery
        </Button>
      </Link>
    </main>
  );
}