"use client";

import { addArtwork } from "@/lib/api/artworks";
import { imageUpload } from "@/lib/imgUpload";
import { Button, Input, Label, Modal } from "@heroui/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AddArtworkModal() {
  const [fileName, setFileName] = useState("");
  const { data: session } = authClient.useSession();
  console.log(session);
  
const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const loadingToast = toast.loading("Uploading artwork...");

  try {
    const image = await imageUpload(data.image);

    const artwork = {
      ...data,
      image: image.url,
      artistName: session?.user?.name,
      artistEmail: session?.user?.email,
      artistId: session?.user?.id,
      artistImage: session?.user?.image,
      status: "available",
      featured: false,
      createdAt: new Date(),
    };

    const result = await addArtwork(
  artwork,
  session?.session?.token
);
   console.log(session?.session);

    if (result?.insertedId) {
      toast.success("🎉 Artwork added successfully!", {
        id: loadingToast,
      });

      e.target.reset();
      setFileName("");
    } else {
      toast.error("Failed to add artwork", {
        id: loadingToast,
      });
    }
  } catch (error) {
    console.log(error);

    toast.error("Something went wrong!", {
      id: loadingToast,
    });
  }
};

  return (
    <Modal>
   
      <Modal.Trigger>
        <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition">
          Add New Artwork
        </Button>
      </Modal.Trigger>

      {/* Modal */}
      <Modal.Backdrop className="bg-black/80 backdrop-blur-md">
        <Modal.Container placement="center">
          <Modal.Dialog className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-pink-500  bg-[#0b0e17]/95 backdrop-blur-xl shadow-[0_0_60px_rgba(236,72,153,0.25)]">

          
            <div className="absolute -top-20 -left-20 h-44 w-44 rounded-full bg-pink-500/20 blur-3xl"></div>

            <div className="absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl"></div>

          
            <Modal.Header className="relative border-b border-white/10 px-6 py-5">
              <div className="flex items-center justify-between w-full">
                <div>
                  <Modal.Heading className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                    Add New Artwork
                  </Modal.Heading>

                  <p className="mt-1 text-sm text-gray-400">
                    Showcase your creativity 🎨
                  </p>
                </div>

                <Modal.CloseTrigger className="rounded-full p-2 bg-white/5 text-gray-400 hover:bg-pink-500/20 hover:text-white transition-all duration-300" />
              </div>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="relative p-6">
              <form onSubmit={onSubmit} className="space-y-5">

                <div>
                  <Label className="mb-2 block text-gray-300">
                    Artwork Title
                  </Label>

                  <Input
                    name="title"
                    placeholder="Enter artwork title"
                    required
                    className="rounded-2xl border border-slate-700 bg-slate-900/80 text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label className="mb-2 block text-gray-300">
                    Description
                  </Label>

                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Describe your artwork..."
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-3 text-white outline-none transition-all focus:border-pink-500 focus:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                  />
                </div>

          
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <Label className="mb-2 block text-gray-300">
                      Price ($)
                    </Label>

                    <Input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      required
                      className="rounded-2xl border border-slate-700 bg-slate-900/80 text-white"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block text-gray-300">
                      Category
                    </Label>

                    <select
                      name="category"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    >
                      <option value="Painting">Painting</option>
                      <option value="Digital">Digital</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Photography">Photography</option>
                    </select>
                  </div>
                </div>

            
               <div>
  <Label className="mb-3 block text-gray-300">
    Upload Artwork
  </Label>

  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-500/40 bg-slate-900/50 p-6 text-center transition hover:border-cyan-500 hover:bg-slate-900">

    <span className="text-4xl mb-2">🎨</span>

    <p className="font-semibold text-white">
      Click to upload
    </p>

    {fileName ? (
      <p className="mt-2 text-sm text-cyan-400 font-medium">
        {fileName}
      </p>
    ) : (
      <p className="mt-1 text-xs text-gray-400">
        PNG, JPG, JPEG supported
      </p>
    )}

    <input
      type="file"
      name="image"
      required
      className="hidden"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          setFileName(e.target.files[0].name);
        }
      }}
    />
  </label>
</div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4">

                  <Button
                    slot="close"
                    className="rounded-2xl border border-slate-700 bg-slate-800 px-6 text-white hover:bg-slate-700"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-8 font-bold text-white shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all hover:scale-105"
                  >
                    Submit 
                  </Button>

                </div>

              </form>
            </Modal.Body>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}