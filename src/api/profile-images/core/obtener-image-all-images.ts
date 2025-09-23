import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseAllImages } from "../interfaces/response-all-images";

export const obtenerTodasImages = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/images-client/all-images`;

  const response = await veterinariaAPI.get<ResponseAllImages[]>(url);
  return response;
};
