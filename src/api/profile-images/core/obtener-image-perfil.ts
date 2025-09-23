import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponsePerfil } from "../interfaces/obtener-perfil.response.interfase";

export const obtenerPerfil = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/images-client/current`;

  const response = await veterinariaAPI.get<ResponsePerfil>(url);
  return response;
};
