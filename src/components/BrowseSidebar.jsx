"use client";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

export default function BrowseSidebar({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  availability,
  setAvailability,
  resetFilters,
}) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-[#09122E] border border-slate-800 rounded-3xl p-6 sticky top-24">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
            <SlidersHorizontal size={22} />
            Filters
          </h3>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <label className="text-sm text-slate-300 block mb-3">
            SEARCH
          </label>

          <div className="relative">
            <input
              type="text"
              placeholder="Title or artist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D183B] border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none focus:border-pink-500 transition"
            />

            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="block mb-3 text-sm text-slate-300">
            CATEGORY
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#0D183B] border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-pink-500 transition"
          >
            <option value="">All Categories</option>
            <option value="Painting">Painting</option>
            <option value="Digital">Digital</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Photography">Photography</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <label className="block mb-3 text-sm text-slate-300">
            PRICE RANGE
          </label>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="bg-[#0D183B] border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-pink-500 transition"
            />

            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-[#0D183B] border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-pink-500 transition"
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block mb-3 text-sm text-slate-300">
            AVAILABILITY
          </label>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full bg-[#0D183B] border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-pink-500 transition"
          >
            <option value="">All Items</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>

      </div>
    </aside>
  );
}