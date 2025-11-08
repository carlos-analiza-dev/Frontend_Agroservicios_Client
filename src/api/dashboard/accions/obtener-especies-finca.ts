import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseEspeciesByFinca } from "../interfaces/response-especies-fincas.interface";

export const ObtenerEspeciesFincas = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/fincas-especies`;

  const response = await veterinariaAPI.get<ResponseEspeciesByFinca[]>(url);
  return response.data;
};
