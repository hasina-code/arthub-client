

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const addArtwork = async (artwork) => {
 

  const res = await fetch(`${baseURL}/artist/artworks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    //  Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(artwork),
  });

  const data = await res.json();

  

  return data;
};