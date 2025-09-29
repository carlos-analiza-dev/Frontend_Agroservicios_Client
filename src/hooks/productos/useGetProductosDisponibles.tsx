import { useInfiniteQuery } from "@tanstack/react-query";
import { ObtenerProductos } from "@/api/productos/accions/obtener-productos-disponibles";

const useGetProductosDisponibles = (limit = 10, tipo_categoria = "") => {
  return useInfiniteQuery({
    queryKey: ["obtener-productos-disponibles", tipo_categoria],
    queryFn: ({ pageParam = 0 }) =>
      ObtenerProductos({
        pageParam,
        limit,
        tipo_categoria,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length * limit;
    },
    retry: false,
    enabled: true,
  });
};

export default useGetProductosDisponibles;
