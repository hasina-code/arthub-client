"use client";

import { MessageSquare } from "lucide-react";

export default function ArtworkComments({
  session,
}) {
  return (
    <div className="mt-14 bg-[#09122E] border border-slate-800 rounded-[40px] p-8">

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
        <textarea
          className="w-full h-40 bg-[#0D183B] border border-slate-700 rounded-2xl p-5"
          placeholder="Write review..."
        />
      )}

    </div>
  );
}