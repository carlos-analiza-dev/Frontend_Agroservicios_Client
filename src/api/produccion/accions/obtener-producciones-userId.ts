import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ObtenerProduccionByUserInterface } from "../interface/obter-producciones-userId.interface";

export const obtenerProduccionesByUserId = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-finca/propietario/${id}`;

  const response =
    await veterinariaAPI.get<ObtenerProduccionByUserInterface[]>(url);
  return response.data;
};
