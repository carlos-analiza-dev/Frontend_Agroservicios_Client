import { ObtenerProductoById } from "@/api/productos/accions/obtener-producto-byId";
import { useQuery } from "@tanstack/react-query";

const useGetProductoById = (id: string) => {
  return useQuery({
    queryKey: ["producto-id", id],
    queryFn: () => ObtenerProductoById(id),
    retry: false,
    staleTime: 60 * 5 * 100,
  });
};

export default useGetProductoById;
