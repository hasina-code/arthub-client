"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import ProfileForms from "@/components/dashboard/profile/ProfileForms";



export default function AdminProfilePage() {
  const { data: session, isPending } =
    authClient.useSession();

  const [userData, setUserData] =
    useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${session.user.email}`
      );

      setUserData(res.data);
      setName(res.data.name || "");
      setImage(res.data.image || "");
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending || !userData) {
    return (
      <div className="min-h-screen bg-[#050B23] flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050B23] text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Profile Management
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          <ProfileCard
            userData={userData}
            name={name}
            image={image}
          />

          <ProfileForms
            session={session}
            userData={userData}
            name={name}
            setName={setName}
            image={image}
            setImage={setImage}
            fetchUser={fetchUser}
          />

        </div>
      </div>
    </section>
  );
}