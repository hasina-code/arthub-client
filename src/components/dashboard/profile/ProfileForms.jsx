"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";

import { imageUpload } from "@/lib/imgUpload";
import { authClient } from "@/lib/auth-client";

export default function ProfileForms({
  session,
  userData,
  name,
  setName,
  image,
  setImage,
  fetchUser,
}) {

  const [loading, setLoading] =
    useState(false);

  const [fileName, setFileName] =
    useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  // Update Profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = image;

      if (e.target.profileImage.files[0]) {
        const uploaded = await imageUpload(
          e.target.profileImage.files[0]
        );

        imageUrl = uploaded.url;
      }

      const token =
        session?.session?.token ||
        session?.token;

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/profile`,
        {
          name,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        res.data.message ||
          "Profile updated successfully"
      );

      setImage(imageUrl);
      fetchUser();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Change Password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(
        "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");

    } catch (error) {
      toast.error(
        error.message ||
          "Password change failed"
      );
    }
  };

  return (
    <div className="lg:col-span-2 space-y-8">

      {/* Edit Profile */}

      <div className="bg-[#09122E] rounded-3xl border border-slate-800 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <form
          onSubmit={handleProfileUpdate}
          className="space-y-5"
        >

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-[#0D183B] p-4 rounded-2xl"
          />

          <input
            type="email"
            value={userData?.email}
            disabled
            className="w-full bg-[#0D183B] p-4 rounded-2xl opacity-60"
          />

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-500/40 bg-[#0D183B] p-6">

            <Camera className="w-10 h-10 text-pink-500 mb-3" />

            <p>
              {fileName || "Click to Upload"}
            </p>

            <input
              type="file"
              name="profileImage"
              className="hidden"
              accept="image/*"
              onChange={(e) => {

                if (e.target.files?.[0]) {

                  setFileName(
                    e.target.files[0].name
                  );

                  setImage(
                    URL.createObjectURL(
                      e.target.files[0]
                    )
                  );
                }
              }}
            />

          </label>

          <button
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600"
          >
            {loading
              ? "Updating..."
              : "Update Profile"}
          </button>

        </form>

      </div>

      {/* Change Password */}

      <div className="bg-[#09122E] rounded-3xl border border-slate-800 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <form
          onSubmit={handlePasswordChange}
          className="space-y-5"
        >

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            className="w-full bg-[#0D183B] p-4 rounded-2xl"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="w-full bg-[#0D183B] p-4 rounded-2xl"
          />

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600">
            Change Password
          </button>

        </form>

      </div>

    </div>
  );
}