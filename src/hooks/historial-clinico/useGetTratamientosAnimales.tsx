import { ObtenerTratamientosAnimal } from "@/api/historial-clinico/accions/obtener-tratamientos-animal";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface UseGetHistorial {
  limit?: number;
  offset?: number;
  fechaInicio?: string;
  fechaFin?: string;
  fincaNombre?: string;
  identificador?: string;
}

const useGetTratamientosAnimales = ({
  limit = 10,
  offset = 0,
  fechaInicio,
  fechaFin,
  fincaNombre,
  identificador,
}: UseGetHistorial = {}) => {
  return useQuery({
    queryKey: [
      "tratamientos-animal",
      fincaNombre,
      limit,
      offset,
      fechaInicio,
      fechaFin,
      identificador,
    ],
    queryFn: () =>
      ObtenerTratamientosAnimal({
        limit,
        offset,
        fechaInicio,
        fechaFin,
        fincaNombre,
        identificador,
      }),
    retry: false,
    staleTime: 60 * 1000 * 5,
  });
};

export default useGetTratamientosAnimales;
