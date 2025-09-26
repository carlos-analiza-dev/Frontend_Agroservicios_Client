import useGetProductosRelacionados from "@/hooks/productos/useGetProductosRelacionados";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  Heart,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";
import { useAuthStore } from "@/providers/store/useAuthStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFavoritos } from "@/hooks/favoritos/useFavoritos";

interface Props {
  categoriaId: string;
  producto: string;
  tipo: string;
  limit?: number;
}

const ProductosRelacionados = ({
  categoriaId,
  producto,
  tipo,
  limit = 6,
}: Props) => {
  const { cliente } = useAuthStore();
  const { esFavorito, toggleFavorito } = useFavoritos();

  const {
    data: productos_relacionados,
    isLoading,
    isError,
  } = useGetProductosRelacionados(categoriaId ?? "", producto, tipo ?? "");

  const getPrecio = (producto: any) => {
    if (!producto?.preciosPorPais || producto.preciosPorPais.length === 0) {
      return "0.00";
    }
    return producto.preciosPorPais[0]?.precio || "0.00";
  };

  const getImagenPrincipal = (imagenes: any[]) => {
    if (!imagenes || imagenes.length === 0) {
      return "/images/ProductNF.png";
    }
    return imagenes[0]?.url || "/images/ProductNF.png";
  };

  const handleToggleFavorite = (e: React.MouseEvent, producto: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorito(producto);
  };

  if (isError) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">
            Error al cargar productos relacionados
          </p>
        </CardContent>
      </Card>
    );
  }

  if (
    !isLoading &&
    (!productos_relacionados || productos_relacionados.length === 0)
  ) {
    return null;
  }

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">Productos Relacionados</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/productos">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2 mb-3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <div className="relative">
              <CarouselContent className="-ml-2 md:-ml-4">
                {productos_relacionados?.slice(0, limit).map((producto) => {
                  const isFavorite = esFavorito(producto.id);

                  return (
                    <CarouselItem
                      key={producto.id}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full">
                        <CardContent className="p-0 flex flex-col h-full">
                          <div className="relative aspect-square overflow-hidden flex-shrink-0">
                            <Image
                              src={getImagenPrincipal(producto.imagenes)}
                              alt={producto.nombre}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {producto.marca && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-black/80 text-white"
                                >
                                  {producto.marca.nombre}
                                </Badge>
                              )}
                              <Badge
                                variant={
                                  producto.disponible
                                    ? "default"
                                    : "destructive"
                                }
                                className="text-xs"
                              >
                                {producto.disponible ? "Disponible" : "Agotado"}
                              </Badge>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className={`absolute top-2 right-2 h-8 w-8 rounded-full transition-all duration-300 ${
                                isFavorite
                                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                                  : "bg-white/90 hover:bg-white"
                              }`}
                              onClick={(e) => handleToggleFavorite(e, producto)}
                              title={
                                isFavorite
                                  ? "Remover de favoritos"
                                  : "Agregar a favoritos"
                              }
                            >
                              <Heart
                                className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                              />
                            </Button>
                          </div>

                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-semibold text-sm mb-2 line-clamp-2 flex-grow">
                              {producto.nombre}
                            </h3>

                            <div className="flex items-center justify-between mb-3">
                              <span className="text-lg font-bold text-green-600">
                                {cliente?.pais?.simbolo_moneda || "$"}
                                {getPrecio(producto)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <Badge variant="outline" className="text-xs">
                                {producto.unidad_venta}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Cód: {producto.codigo}
                              </span>
                            </div>

                            <div className="flex gap-2 mt-auto">
                              <Button
                                asChild
                                className="flex-1"
                                size="sm"
                                disabled={!producto.disponible}
                              >
                                <Link href={`/productos/${producto.id}`}>
                                  Ver detalles
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="flex-shrink-0"
                                disabled={!producto.disponible}
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="left-0 -translate-x-1/2 hidden sm:flex" />
              <CarouselNext className="right-0 translate-x-1/2 hidden sm:flex" />
            </div>
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductosRelacionados;
