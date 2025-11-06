import { ObtenerHistorialAnimal } from "@/api/historial-clinico/accions/obtener-historia-animal";
import { useQuery } from "@tanstack/react-query";

interface UseGetHistorial {
  limit?: number;
  offset?: number;
  fechaInicio?: string;
  fechaFin?: string;
  fincaNombre?: string;
  identificador?: string;
}

const useGetHistorialAnimal = ({
  limit = 10,
  offset = 0,
  fechaInicio,
  fechaFin,
  fincaNombre,
  identificador,
}: UseGetHistorial = {}) => {
  return useQuery({
    queryKey: [
      "historial-clinico-animales",
      fincaNombre,
      limit,
      offset,
      fechaInicio,
      fechaFin,
      identificador,
    ],
    queryFn: () =>
      ObtenerHistorialAnimal({
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

export default useGetHistorialAnimal;
