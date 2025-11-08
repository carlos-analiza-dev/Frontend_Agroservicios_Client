import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseProduccionGanaderaByFinca } from "../interfaces/response-produccion-ganadera-fincas.interface";

export const ObtenerProduccionBovinos = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/produccion-ganadera`;

  const response =
    await veterinariaAPI.get<ResponseProduccionGanaderaByFinca>(url);
  return response.data;
};
