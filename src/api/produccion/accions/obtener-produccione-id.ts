import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ObtenerProduccionByUserInterface } from "../interface/obter-producciones-userId.interface";

export const obtenerProduccion = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-finca/${id}`;

  const response =
    await veterinariaAPI.get<ObtenerProduccionByUserInterface>(url);
  return response.data;
};
