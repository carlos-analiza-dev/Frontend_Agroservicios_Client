import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";

export const ObtenerTotalFincas = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/total-fincas`;

  const response = await veterinariaAPI.get<number>(url);
  return response.data;
};
