import AddArtworkModal from "@/components/dashboard/artist/AddArtworkModal";

const ManageArtworksPage = () => {
  
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Artworks</h1>
        <AddArtworkModal />
      </div>
    </div>
  );
};

export default ManageArtworksPage ;