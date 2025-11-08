import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { AnimalesMuerteInterface } from "../interfaces/animales-muerte.interface";

export const ObtenerTotalAnimalesMuerte = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/animales-muerte`;

  const response = await veterinariaAPI.get<AnimalesMuerteInterface>(url);
  return response.data;
};
