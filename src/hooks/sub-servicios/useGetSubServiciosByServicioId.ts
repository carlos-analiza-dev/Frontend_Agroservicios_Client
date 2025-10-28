import { ObtenerSubServiciosByServicioId } from "@/api/sub-servicio/accions/get-sub-serviciosByServicio";
import { useQuery } from "@tanstack/react-query";

const useGetSubServiciosByServicioId = (servicioId: string) => {
  return useQuery({
    queryKey: ["sub-servicios", servicioId],
    queryFn: () => ObtenerSubServiciosByServicioId(servicioId),
    enabled: !!servicioId,
    retry: 0,
  });
};

export default useGetSubServiciosByServicioId;
