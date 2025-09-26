import { ObtenerProductosRelacionados } from "@/api/productos/accions/obtener-productos-relacionados";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetProductosRelacionados = (
  categoriaId: string,
  producto: string,
  tipo: string
) => {
  return useQuery({
    queryKey: ["productos-relacionados", categoriaId, producto, tipo],
    queryFn: () => ObtenerProductosRelacionados(categoriaId, producto, tipo),
    retry: false,
    staleTime: 60 * 5 * 100,
  });
};

export default useGetProductosRelacionados;
