import { authClient } from "@/lib/auth-client";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const addArtwork = async (artwork) => {

  const { data: sessionData } = await authClient.getSession();

  console.log("SESSION:", sessionData);

  const token = sessionData?.session?.token;

  console.log("TOKEN:", token);

  if (!token) {
    throw new Error("Token not found");
  }

  const res = await fetch(`${baseURL}/artist/artworks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(artwork),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Unauthorized");
  }

  return data;
};