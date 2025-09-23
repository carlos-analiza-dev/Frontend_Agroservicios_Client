import { useInfiniteQuery } from "@tanstack/react-query";
import { ObtenerProductos } from "@/api/productos/accions/obtener-productos-disponibles";

const useGetProductosDisponibles = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["obtener-productos-disponibles"],
    queryFn: ({ pageParam = 0 }) => ObtenerProductos({ pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length * limit;
    },
    retry: false,
  });
};

export default useGetProductosDisponibles;
