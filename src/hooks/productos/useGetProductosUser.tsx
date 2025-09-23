import { ObtenerProductos } from "@/api/productos/accions/obtener-productos-disponibles";
import { useQuery } from "@tanstack/react-query";

const useGetProductosUser = () => {
  return useQuery({
    queryKey: ["productos-user"],
    queryFn: ObtenerProductos,
    retry: false,
    refetchInterval: 10000,
  });
};

export default useGetProductosUser;
