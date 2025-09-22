import { ObtenerServicioPaisCantidad } from "@/api/servicios_precios/accions/get-precios-servicio-pais-cantidad";
import { useQuery } from "@tanstack/react-query";

const useGetSubServicioPaisCantidad = (
  servicioId: string,
  paisId: string,
  cantidadAnimales: number
) => {
  return useQuery({
    queryKey: ["sub-servicios-pais", servicioId, paisId, cantidadAnimales],
    queryFn: () =>
      ObtenerServicioPaisCantidad(servicioId, paisId, cantidadAnimales),
    retry: 0,
  });
};

export default useGetSubServicioPaisCantidad;
