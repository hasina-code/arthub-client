"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgUpload";

export default function EditArtworkForm({
  artwork,
  setArtwork,
  id,
}) {
  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const [updating, setUpdating] =
    useState(false);

  const [fileName, setFileName] =
    useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      let imageUrl = artwork.image;

      if (e.target.image.files[0]) {
        const uploaded = await imageUpload(
          e.target.image.files[0]
        );

        imageUrl = uploaded.url;
      }

      const token =
        session?.session?.token ||
        session?.token;

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artworks/${id}`,
        {
          title: artwork.title,
          description: artwork.description,
          price: artwork.price,
          category: artwork.category,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        res.data.message ||
          "Artwork updated successfully"
      );

      router.push(
        "/dashboard/artist/manage-artworks"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-[#09122E] border border-slate-800 rounded-3xl p-8">

      <h1 className="text-4xl font-bold mb-8">
        Edit Artwork
      </h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block mb-2">
            Artwork Title
          </label>

          <input
            type="text"
            value={artwork.title}
            onChange={(e) =>
              setArtwork({
                ...artwork,
                title: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-[#0D183B] border border-slate-700"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2">
            Description
          </label>

          <textarea
            rows={4}
            value={artwork.description}
            onChange={(e) =>
              setArtwork({
                ...artwork,
                description: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-[#0D183B] border border-slate-700"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2">
            Price
          </label>

          <input
            type="number"
            value={artwork.price}
            onChange={(e) =>
              setArtwork({
                ...artwork,
                price: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-[#0D183B] border border-slate-700"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2">
            Category
          </label>

          <select
            value={artwork.category}
            onChange={(e) =>
              setArtwork({
                ...artwork,
                category: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl bg-[#0D183B] border border-slate-700"
          >
            <option value="Painting">
              Painting
            </option>

            <option value="Digital">
              Digital
            </option>

            <option value="Photography">
              Photography
            </option>

            <option value="Sculpture">
              Sculpture
            </option>
          </select>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block mb-3">
            Upload New Image
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-500/40 bg-[#0D183B] p-6">

            <p className="text-lg">
              {fileName
                ? fileName
                : "Click to Upload"}
            </p>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFileName(
                    e.target.files[0].name
                  );
                }
              }}
            />
          </label>
        </div>

        {/* Current Image */}
        <div>
          <p className="mb-2">
            Current Image
          </p>

          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-72 object-cover rounded-2xl"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={updating}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold"
        >
          {updating
            ? "Updating..."
            : "Update Artwork"}
        </button>
      </form>
    </div>
  );
}