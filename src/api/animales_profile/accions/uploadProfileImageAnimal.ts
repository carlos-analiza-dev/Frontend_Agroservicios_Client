import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";

export const uploadProfileImageAnimal = async (
  imageDataUrl: string,
  animalId: string
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/images-aminales/upload/${animalId}`;

  try {
    // Convertir Data URL a Blob directamente
    const base64Response = await fetch(imageDataUrl);
    const blob = await base64Response.blob();

    const formData = new FormData();
    formData.append("file", blob, `animal-${animalId}-profile.jpg`);

    const response = await veterinariaAPI.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw new Error("No se pudo subir la imagen de perfil");
  }
};
