import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { FincasTipoExplotacionInterface } from "../interfaces/fincas-tipos-explotacion.interface";

export const ObtenerFincasTipoExplotacion = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/fincas-tipo-explotacion`;

  const response =
    await veterinariaAPI.get<FincasTipoExplotacionInterface[]>(url);
  return response.data;
};
