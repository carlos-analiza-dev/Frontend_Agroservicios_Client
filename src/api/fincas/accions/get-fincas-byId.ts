import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { Finca } from "../interfaces/response-fincasByPropietario.interface";

export const ObtenerFincasById = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/fincas-ganadero/${id}`;

  const response = await veterinariaAPI.get<Finca>(url);
  return response;
};
