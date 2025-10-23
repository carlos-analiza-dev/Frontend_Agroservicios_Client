import { obtenerProduccion } from "@/api/produccion/accions/obtener-produccione-id";

import { useQuery } from "@tanstack/react-query";

const useGetProduccionById = (produccionId: string) => {
  return useQuery({
    queryKey: ["produccion-id"],
    queryFn: () => obtenerProduccion(produccionId),
    staleTime: 60 * 5 * 100,
    retry: 0,
  });
};

export default useGetProduccionById;
