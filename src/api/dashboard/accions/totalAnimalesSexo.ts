import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseTotalAnimalesSexo } from "../interfaces/total-animales-sexo.interface";

export const ObtenerTotalAnimalesSexo = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/animales-sexo`;

  const response = await veterinariaAPI.get<ResponseTotalAnimalesSexo[]>(url);
  return response.data;
};
