"use client";
import { Input, Button } from "@heroui/react";

export default function FilterSidebar() {
  return (
    <aside className="bg-[#0f111a] border border-gray-800 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button className="text-gray-500 hover:text-white text-sm">✕ Reset</button>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold mb-2">SEARCH</p>
        <Input placeholder="Title or artist..." className="bg-[#1b1e2b] border-gray-700" />
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold mb-2">CATEGORY</p>
        <select className="w-full bg-[#1b1e2b] border border-gray-700 p-2 rounded-lg text-white">
          <option>All Categories</option>
          <option>Painting</option>
          <option>Digital</option>
        </select>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold mb-2">PRICE RANGE</p>
        <div className="flex gap-2">
          <Input placeholder="Min" className="bg-[#1b1e2b] border-gray-700" />
          <Input placeholder="Max" className="bg-[#1b1e2b] border-gray-700" />
        </div>
      </div>

      <Button className="w-full bg-white text-black font-bold">Apply Price</Button>
    </aside>
  );
}