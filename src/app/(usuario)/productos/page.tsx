"use client";

import useGetProductosDisponibles from "@/hooks/productos/useGetProductosDisponibles";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/providers/store/useAuthStore";
import { MessageError } from "@/components/generics/MessageError";
import ProductCard from "./ui/ProductCard";

const ProductosPage = () => {
  const { cliente } = useAuthStore();
  const router = useRouter();
  const [tipoCategoria, setTipoCategoria] = useState("");

  const {
    data: productosData,
    isError,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetProductosDisponibles(10, tipoCategoria);

  const todosLosProductos = useMemo(() => {
    return productosData?.pages.flatMap((page) => page.productos) || [];
  }, [productosData]);

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleProductClick = (productoId: string) => {
    router.push(`/productos/${productoId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetchingNextPage
      ) {
        return;
      }
      if (hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <MessageError
          titulo="Error al cargar los productos"
          descripcion="No se encontraron productos disponibles en este momento."
          onPress={onRefresh}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Productos Disponibles</h1>
          <p className="text-muted-foreground">
            Descubre nuestra amplia gama de productos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
          <Button
            variant="outline"
            className={tipoCategoria === "" ? "border-blue-500" : ""}
            onClick={() => setTipoCategoria("")}
          >
            Todos
          </Button>

          <Button
            variant="outline"
            className={tipoCategoria === "Ganaderia" ? "border-blue-500" : ""}
            onClick={() => setTipoCategoria("Ganaderia")}
          >
            Ganadería
          </Button>

          <Button
            variant="outline"
            className={tipoCategoria === "Agricultura" ? "border-blue-500" : ""}
            onClick={() => setTipoCategoria("Agricultura")}
          >
            Agricultura
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {todosLosProductos.map((producto, index) => (
            <ProductCard
              key={index}
              producto={producto}
              user={cliente}
              onPress={() => handleProductClick(producto.id)}
            />
          ))}
        </div>

        {isFetchingNextPage && (
          <div className="flex justify-center mt-8">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        )}

        {hasNextPage && !isFetchingNextPage && (
          <div className="flex justify-center mt-8">
            <Button onClick={() => fetchNextPage()} variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cargar más productos
            </Button>
          </div>
        )}

        {!hasNextPage && todosLosProductos.length > 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            Has visto todos los productos disponibles
          </div>
        )}

        {todosLosProductos.length === 0 && (
          <div className="text-center mt-16">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-muted-foreground">
              Prueba a recargar la página o vuelve más tarde
            </p>
            <Button onClick={onRefresh} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Recargar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosPage;
