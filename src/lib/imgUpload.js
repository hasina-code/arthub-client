export const imageUpload = async (image) => {
  if (!image) return null;

  const formData = new FormData();
  formData.append("image", image);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    // const result = await res.json();
    
  
    if (result.success) {
      return result.data; 
    } else {
      throw new Error("ImgBB API returned an error");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};