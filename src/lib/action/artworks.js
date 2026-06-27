const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFeaturedArtworks = async () => {
  const res = await fetch(`${baseURL}/artworks/featured`);

  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }

  return res.json();
};