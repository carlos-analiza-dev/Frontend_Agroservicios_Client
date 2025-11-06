import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseTratamientoAnimalInterface } from "../interface/response-tratamientos-animal.interface";

interface FiltrosHistorial {
  limit?: number;
  offset?: number;
  veterinario?: string;
  fechaInicio?: string;
  fechaFin?: string;
  identificador?: string;
  fincaNombre?: string;
}

export const ObtenerTratamientosAnimal = async (
  filtros: FiltrosHistorial = {}
) => {
  const {
    limit = 10,
    offset = 0,
    fechaInicio,
    fechaFin,
    identificador,
    fincaNombre,
  } = filtros;

  const params = new URLSearchParams();

  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);
  if (identificador) params.append("identificador", identificador);
  if (fincaNombre) params.append("fincaNombre", fincaNombre);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/historial-clinico/tratamientos?${params.toString()}`;

  const response =
    await veterinariaAPI.get<ResponseTratamientoAnimalInterface>(url);
  return response.data;
};
