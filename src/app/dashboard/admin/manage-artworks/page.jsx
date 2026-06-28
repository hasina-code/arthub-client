"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import DeleteModal from "@/components/dashboard/DeleteModal";

export default function ManageArtworksPage() {
  const [artworks, setArtworks] = useState([]);

  const [selectedId, setSelectedId] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const { data: session } =
    authClient.useSession();

  useEffect(() => {
    if (session) {
      fetchArtworks();
    }
  }, [session]);

  const fetchArtworks = async () => {
    try {
      const token =
        session?.session?.token ||
        session?.token;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/artworks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArtworks(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load artworks");
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const token =
        session?.session?.token ||
        session?.token;

      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/artworks/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      setShowModal(false);

      fetchArtworks();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Manage All Artworks
      </h1>

      <div className="bg-[#09122E] rounded-3xl border border-slate-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#0D183B]">

            <tr>
              <th className="p-5 text-left">
                Title
              </th>

              <th className="p-5 text-left">
                Artist Name
              </th>

              <th className="p-5 text-left">
                Price
              </th>

              {/* <th className="p-5 text-left">
                Action
              </th>
            </tr> */}

          </thead>

          <tbody>

            {artworks.map((art) => (
              <tr
                key={art._id}
                className="border-t border-slate-800"
              >
                <td className="p-5">
                  {art.title}
                </td>

                <td className="p-5">
                  {art.artistName}
                </td>

                <td className="p-5">
                  ${art.price}
                </td>

                <td className="p-5">

                  <button
                    onClick={() => {
                      setSelectedId(art._id);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />

    </section>
  );
}