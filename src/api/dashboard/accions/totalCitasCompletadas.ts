import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";

export const ObtenerTotalCitasCompletadas = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/total-citas`;

  const response = await veterinariaAPI.get<number>(url);
  return response.data;
};
