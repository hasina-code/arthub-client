"use client";

import Image from "next/image";

export default function ArtworkImage({ artwork }) {
  return (
    <div className="relative h-[700px] rounded-[40px] overflow-hidden border border-slate-800">

      <Image
      //   src={artwork?.image}
      //   alt={artwork?.title || "Artwork"}
      //   fill
      //   className="object-cover"
      //   unoptimized
      // />

    </div>
  );
}