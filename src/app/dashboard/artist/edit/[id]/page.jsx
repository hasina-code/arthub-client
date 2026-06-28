"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import EditArtworkForm from "@/components/dashboard/artist/edit-artwork/EditArtworkForm";
import { Loader2 } from "lucide-react";


export default function EditArtworkPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  // const [artwork, setArtwork] = useState({
  //   title: "",
  //   description: "",
  //   price: "",
  //   category: "",
  //   image: "",
  // });

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const fetchArtwork = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artworks/${id}`
      );

      setArtwork(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Artwork not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div className="min-h-screen bg-[#050B23] flex justify-center items-center">
      <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
    </div>
  
  }

  return (
    <section className="min-h-screen bg-[#050B23] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <EditArtworkForm
          artwork={artwork}
          setArtwork={setArtwork}
          id={id}
        />
      </div>
    </section>
  );
}