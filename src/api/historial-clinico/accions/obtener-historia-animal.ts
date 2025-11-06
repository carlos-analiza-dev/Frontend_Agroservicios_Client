import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseHistorialVetInterface } from "../interface/response-historial-veterinario.interface";

interface FiltrosHistorial {
  limit?: number;
  offset?: number;
  fechaInicio?: string;
  fechaFin?: string;
  fincaNombre?: string;
  identificador?: string;
}

export const ObtenerHistorialAnimal = async (
  filtros: FiltrosHistorial = {}
) => {
  const {
    limit = 10,
    offset = 0,
    fechaInicio,
    fechaFin,
    fincaNombre,
    identificador,
  } = filtros;

  const params = new URLSearchParams();

  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);
  if (fincaNombre) params.append("fincaNombre", fincaNombre);
  if (identificador) params.append("identificador", identificador);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/historial-clinico/finca?${params.toString()}`;

  const response = await veterinariaAPI.get<ResponseHistorialVetInterface>(url);
  return response.data;
};
