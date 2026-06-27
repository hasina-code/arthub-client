import ArtworkCard from "./ArtworkCard";

export default function ArtworkGrid({ artworks }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {artworks.map((art) => (
        <ArtworkCard key={art._id} art={art} />
      ))}
    </div>
  );
}