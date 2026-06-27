"use client";

import { ArrowUpDown } from "lucide-react";

export default function BrowseTopBar({
  total,
  sort,
  setSort,
}) {
  return (
    <div className="bg-[#09122E] border border-slate-800 rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between">

      <p className="text-slate-300">
        Showing{" "}
        <span className="font-bold text-white">
          {total}
        </span>{" "}
        Artworks
      </p>

      <div className="flex items-center gap-3">
        <ArrowUpDown
          size={18}
          className="text-indigo-400"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#0D183B] border border-slate-800 rounded-xl px-4 py-3 text-white"
        >
          <option value="newest">
            Sort by: Newest
          </option>

          <option value="low">
            Price Low → High
          </option>

          <option value="high">
            Price High → Low
          </option>
        </select>
      </div>
    </div>
  );
}