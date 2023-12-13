import { useState } from "react";
import toast from "react-hot-toast";
const useImageUploader = (cloudName) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (files) => {
    const data = new FormData();
    data.append("upload_preset", "gmrltpup");
    data.append("cloud_name", cloudName);

    try {
      setUploading(true);

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "myh3dclk");
        formData.append("cloud_name", cloudName);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          return responseData.secure_url;
        } else {
          toast.error("Issue while Uploading Image");
          return null;
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const filteredImages = uploadedImages.filter((image) => image !== null);

      return filteredImages;
    } catch (error) {
      toast.error("Issue while Uploading Image");
    } finally {
      setUploading(false);
    }
  };

  return { handleImageUpload, uploading };
};

export default useImageUploader;
