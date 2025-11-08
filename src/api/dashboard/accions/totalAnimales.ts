import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";

export const ObtenerTotalAnimales = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/total-animales`;

  const response = await veterinariaAPI.get<number>(url);
  return response.data;
};
