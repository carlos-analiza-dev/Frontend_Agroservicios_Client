import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";

export const eliminarImagenAnimal = async (imageId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/images-aminales/${imageId}`;

  const response = await veterinariaAPI.delete(url);
  return response;
};
