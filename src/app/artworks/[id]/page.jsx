"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import ArtworkImage from "@/components/artwork-details/ArtworkImage";
import ArtworkInfo from "@/components/artwork-details/ArtworkInfo";
import ArtworkComments from "@/components/artwork-details/ArtworkComments";


export default function ArtworkDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const fetchArtwork = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artworks/${id}`
      );

      setArtwork(res.data);
    } catch (error) {
      console.log(error);
      setArtwork(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading || isPending) {
    return (
      <div className="min-h-screen bg-[#050B23] flex justify-center items-center">
        <h2 className="text-3xl text-white">
          Loading...
        </h2>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-[#050B23] flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-white">
          Artwork Not Found
        </h1>

        <Link
          href="/browse"
          className="mt-6 text-pink-400"
        >
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050B23] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-10">

          <ArtworkImage artwork={artwork} />

          <ArtworkInfo
            artwork={artwork}
            session={session}
            router={router}
          />

        </div>

        <ArtworkComments session={session} />

      </div>
    </section>
  );
}