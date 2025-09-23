import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";

export const uploadProfileImage = async (uri: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/images-client/upload`;

  const res = await fetch(uri);
  const blob = await res.blob();

  const filename = uri.split("/").pop() || "image.jpg";
  const file = new File([blob], filename, { type: blob.type });

  const formData = new FormData();
  formData.append("file", file);

  const response = await veterinariaAPI.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
