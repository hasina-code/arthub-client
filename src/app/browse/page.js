
    "use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";
import ArtworkGrid from "@/components/ArtworkGrid";
import BrowseSidebar from "@/components/BrowseSidebar";
import BrowseTopBar from "@/components/BrowseTopBar";



export default function BrowsePage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artworks`
      );

      setArtworks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtworks = useMemo(() => {
    let filtered = [...artworks];

    if (search) {
      filtered = filtered.filter(
        (art) =>
          art.title.toLowerCase().includes(search.toLowerCase()) ||
          art.artistName
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(
        (art) => art.category === category
      );
    }

    if (minPrice) {
      filtered = filtered.filter(
        (art) => art.price >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (art) => art.price <= Number(maxPrice)
      );
    }

    if (availability) {
      filtered = filtered.filter(
        (art) => art.status === availability
      );
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return filtered;
  }, [
    artworks,
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    availability,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setAvailability("");
  };

  return (
    <section className="min-h-screen bg-[#050B23] py-14 text-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Artworks</span>
          </h1>

          <p className="text-slate-400 mt-3">
            Discover unique pieces created by verified
            artists from around the world.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          <BrowseSidebar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            availability={availability}
            setAvailability={setAvailability}
            resetFilters={resetFilters}
          />

          <div className="lg:col-span-3">

            <BrowseTopBar
              total={filteredArtworks.length}
              sort={sort}
              setSort={setSort}
            />

            {loading ? (
              <LoadingSkeleton />
            ) : filteredArtworks.length === 0 ? (
              <EmptyState />
            ) : (
              <ArtworkGrid artworks={filteredArtworks} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}  