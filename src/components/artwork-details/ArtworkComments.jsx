"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
MessageSquare,
Pencil,
Trash2,
} from "lucide-react";

export default function ArtworkComments({
session,
artworkId,
}) {
const [comments, setComments] =
useState([]);

const [text, setText] =
useState("");

const [loading, setLoading] =
useState(false);

useEffect(() => {
fetchComments();
}, [artworkId]);

const fetchComments = async () => {
try {
const res = await axios.get(
`${process.env.NEXT_PUBLIC_SERVER_URL}/artworks/${artworkId}/comments`
);


  setComments(res.data);
} catch (error) {
  console.log(error);
}


};

const handleComment = async () => {
try {
setLoading(true);


  const token =
    session?.session?.token ||
    session?.token;

  await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/artworks/${artworkId}/comments`,
    {
      comment: text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success("Comment added");

  setText("");

  fetchComments();
} catch (error) {
  toast.error(
    error.response?.data?.message
  );
} finally {
  setLoading(false);
}


};

const handleDelete = async (id) => {
try {
const token =
session?.session?.token ||
session?.token;


  await axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success("Deleted");

  fetchComments();
} catch (error) {
  toast.error("Delete failed");
}


};

return ( <div className="mt-14 bg-[#09122E] border border-slate-800 rounded-[40px] p-8">


  <div className="flex items-center gap-3 mb-8">
    <MessageSquare />

    <h2 className="text-3xl font-bold">
      Reviews & Comments
    </h2>
  </div>

  {!session ? (
    <div className="border border-slate-700 rounded-2xl p-5 text-slate-400">
      Please login to comment.
    </div>
  ) : (
    <div className="space-y-4">

      <textarea
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        className="w-full h-40 bg-[#0D183B] border border-slate-700 rounded-2xl p-5"
        placeholder="Write review..."
      />

      <button
        onClick={handleComment}
        disabled={loading}
        className="bg-pink-600 px-6 py-3 rounded-xl"
      >
        {loading
          ? "Posting..."
          : "Post Comment"}
      </button>

    </div>
  )}

  <div className="space-y-5 mt-10">

    {comments.map((item) => (
      <div
        key={item._id}
        className="bg-[#0D183B] rounded-2xl p-5"
      >

        <div className="flex justify-between">

          <div className="flex gap-4">

            <img
              src={
                item.userImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-bold">
                {item.userName}
              </h3>

              <p className="text-slate-400 text-sm">
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          {session?.user?.email ===
            item.userEmail && (
            <button
              onClick={() =>
                handleDelete(item._id)
              }
              className="text-red-500"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <p className="mt-4 text-slate-300">
          {item.comment}
        </p>

      </div>
    ))}

  </div>

</div>


);
}
