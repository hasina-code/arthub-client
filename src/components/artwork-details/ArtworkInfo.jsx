
"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Calendar,
  ShieldCheck,
  ShoppingCart,
  Pencil,
  Trash2,
} from "lucide-react";
import DeleteModal from "../dashboard/DeleteModal";



export default function ArtworkInfo({
  artwork,
  session,
  router,
}) {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const isOwner =
    session?.user?.email ===
    artwork?.artistEmail;

  const isAdmin =
    session?.user?.role === "admin";

  const handlePurchase = async () => {
    if (!session) {
      toast.error("Please login first");
      router.push("/signin");
      return;
    }

    if (isAdmin) {
      toast.error(
        "Admin cannot purchase artworks"
      );
      return;
    }

    if (isOwner) {
      toast.error(
        "You cannot purchase your own artwork"
      );
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-checkout-session`,
        {
          artworkId: artwork._id,
          buyerEmail: session.user.email,
        }
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const token =
        session?.session?.token ||
        session?.token;

      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artworks/${artwork._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Artwork deleted");

      setIsModalOpen(false);

      router.push("/browse");
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#09122E] border border-slate-800 rounded-[40px] p-8">

        <div className="flex items-center gap-4 mb-5">
          <span className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300">
            {artwork.category}
          </span>

          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={18} />

            {new Date(
              artwork.createdAt
            ).toLocaleDateString()}
          </div>
        </div>

        <h1 className="text-5xl font-extrabold mb-5">
          {artwork.title}
        </h1>

        <p className="text-slate-400 text-lg leading-8">
          {artwork.description}
        </p>

        <Link
          href={`/artist/${artwork.artistId}`}
          className="flex justify-between items-center border border-slate-700 rounded-3xl p-5 mt-8"
        >
          <div className="flex items-center gap-4">
            <img
              src={
                artwork.artistImage ||
                `https://ui-avatars.com/api/?name=${artwork.artistName}`
              }
              className="w-14 h-14 rounded-full object-cover"
              alt={artwork.artistName}
            />

            <div>
              <p className="text-xs text-slate-500">
                Artist
              </p>

              <h3 className="text-2xl font-bold">
                {artwork.artistName}
              </h3>
            </div>
          </div>

          <div className="flex gap-2 text-emerald-400">
            <ShieldCheck />
            Verified
          </div>
        </Link>

        <div className="grid grid-cols-2 border-y border-slate-800 py-8 my-8">

          <div>
            <p className="text-slate-500">
              Price
            </p>

            <h2 className="text-5xl font-bold mt-3">
              ${artwork.price}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-slate-500">
              Status
            </p>

            <h2 className="text-3xl font-bold text-emerald-400 mt-3">
              {artwork.status}
            </h2>
          </div>

        </div>

        <button
          onClick={handlePurchase}
          disabled={isOwner || isAdmin}
          className={`w-full py-5 rounded-2xl font-bold flex justify-center gap-3 transition-all
          ${
            isOwner || isAdmin
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600"
          }`}
        >
          <ShoppingCart />

          {isOwner
            ? "Your Artwork"
            : isAdmin
            ? "Admin Cannot Purchase"
            : "BUY NOW WITH STRIPE"}
        </button>

        {isOwner && (
          <div className="grid grid-cols-2 gap-4 mt-6">

            <Link
              href={`/dashboard/artist/edit/${artwork._id}`}
              className="bg-yellow-500 py-4 rounded-2xl flex justify-center gap-2"
            >
              <Pencil />
              Edit
            </Link>

            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              className="bg-red-500 py-4 rounded-2xl flex justify-center gap-2"
            >
              <Trash2 />
              Delete
            </button>

          </div>
        )}

      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </>
  );
}

