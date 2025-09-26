"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Store,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/providers/store/useAuthStore";
import useGetProductoById from "@/hooks/productos/useGetProductoById";
import { MessageError } from "@/components/generics/MessageError";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import useGetSucursalesPais from "@/hooks/sucursales/useGetSucursalesPais";
import useGetExistenciaProductoBySucursal from "@/hooks/productos/useGetExistenciaProductoBySucursal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import ProductosRelacionados from "../ui/ProductosRelacionados";
import { useFavoritos } from "@/hooks/favoritos/useFavoritos";

const ProductDetailsPage = () => {
  const { id: productoId } = useParams();
  const { esFavorito, toggleFavorito } = useFavoritos();
  const router = useRouter();
  const { cliente } = useAuthStore();
  const paisId = cliente?.pais.id || "";

  const {
    data: sucursales,
    isLoading: isLoadingSucursales,
    isError: isErrorSucursales,
  } = useGetSucursalesPais(paisId);

  const [sucursalId, setSucursalId] = useState<string>("");

  const {
    data: existencia,
    isLoading: isLoadingExistencia,
    isError: isErrorExistencia,
    refetch: refetchExistencia,
  } = useGetExistenciaProductoBySucursal(productoId as string, sucursalId);

  const {
    data: producto,
    isError: isErrorProducto,
    isLoading: isLoadingProducto,
    refetch: refetchProducto,
  } = useGetProductoById(productoId as string);

  const isFavorite = producto ? esFavorito(producto.id) : false;

  useEffect(() => {
    if (sucursales && sucursales.length > 0 && !sucursalId) {
      setSucursalId(sucursales[0].id);
    }
  }, [sucursales, sucursalId]);

  const getPrecio = () => {
    if (!producto?.preciosPorPais || producto.preciosPorPais.length === 0) {
      return "0.00";
    }
    return producto.preciosPorPais[0].precio || "0.00";
  };

  const getCantidadDisponible = () => {
    if (!existencia || !sucursalId) return 0;
    return existencia || 0;
  };

  const getNombreSucursalSeleccionada = () => {
    if (!sucursales || !sucursalId) return "";
    const sucursal = sucursales.find((s) => s.id === sucursalId);
    return sucursal?.nombre || "";
  };

  const [quantity, setQuantity] = useState(1);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [notas, setNotas] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const handleToggleFavorite = () => {
    if (producto) {
      toggleFavorito(producto);
    }
  };

  useEffect(() => {
    if (carouselApi && selectedImageIndex !== undefined) {
      carouselApi.scrollTo(selectedImageIndex);
    }
  }, [selectedImageIndex, carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setSelectedImageIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  const handleIncrease = () => {
    const cantidadDisponible = getCantidadDisponible();
    if (producto && quantity < cantidadDisponible) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onRefresh = useCallback(async () => {
    await refetchProducto();
    if (sucursalId) {
      await refetchExistencia();
    }
  }, [refetchProducto, refetchExistencia, sucursalId]);

  const handleSucursalChange = (value: string) => {
    setSucursalId(value);
    setQuantity(1);
  };

  const getImagenes = () => {
    if (producto?.imagenes && producto.imagenes.length > 0) {
      return producto.imagenes;
    }

    return [
      {
        id: "default",
        url: "/images/ProductNF.png",
        key: "default",
        mimeType: "image/jpeg",
      },
    ];
  };

  const imagenes = getImagenes();

  useEffect(() => {
    const precio = getPrecio();
    const total = quantity * Number(precio);
    setTotalPrecio(total);
  }, [quantity, producto]);

  if (isErrorSucursales || isErrorProducto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MessageError
          titulo="Error al cargar la información"
          descripcion="Ocurrió un error al cargar los datos del producto o sucursales"
          onPress={onRefresh}
        />
      </div>
    );
  }

  if (isLoadingProducto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MessageError
          titulo="No se encontró el producto seleccionado"
          descripcion="El producto que buscas no está disponible"
          onPress={onRefresh}
        />
      </div>
    );
  }

  const isAvailable = producto.disponible && getCantidadDisponible() > 0;
  const cantidadDisponible = getCantidadDisponible();
  const precio = getPrecio();
  const nombreSucursal = getNombreSucursalSeleccionada();

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/productos")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Productos
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="p-4">
            <Carousel className="w-full" setApi={setCarouselApi}>
              <CarouselContent>
                {imagenes.map((imagen, index) => (
                  <CarouselItem key={imagen.id}>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={imagen.url}
                        alt={`${producto.nombre} - Imagen ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {imagenes.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>

            {imagenes.length > 1 && (
              <div className="mt-4">
                <Carousel
                  className="w-full"
                  opts={{
                    align: "start",
                    dragFree: true,
                  }}
                >
                  <CarouselContent>
                    {imagenes.map((imagen, index) => (
                      <CarouselItem
                        key={imagen.id}
                        className="basis-1/3 md:basis-1/4 lg:basis-1/5"
                      >
                        <div
                          className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                            selectedImageIndex === index
                              ? "border-primary"
                              : "border-transparent"
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <Image
                            src={imagen.url}
                            alt={`${producto.nombre} - Miniatura ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="left-0 scale-75" />
                  <CarouselNext className="right-0 scale-75" />
                </Carousel>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {producto.nombre}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {producto.descripcion || "Sin descripción disponible"}
            </p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-gray-600" />
                <Label htmlFor="sucursal" className="text-lg font-semibold">
                  Seleccionar sucursal
                </Label>
              </div>

              {isLoadingSucursales ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select
                  value={sucursalId}
                  onValueChange={handleSucursalChange}
                  disabled={isLoadingSucursales || !sucursales?.length}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoadingSucursales
                          ? "Cargando sucursales..."
                          : !sucursales?.length
                            ? "No hay sucursales disponibles"
                            : "Selecciona una sucursal"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales?.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {sucursalId && (
                <div className="flex items-center justify-between pt-2">
                  {isLoadingExistencia ? (
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : isErrorExistencia ? (
                    <Badge variant="destructive" className="text-sm">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Error al cargar existencia
                    </Badge>
                  ) : (
                    <>
                      <span className="text-sm text-gray-600">
                        Disponible en {nombreSucursal}:
                      </span>
                      <Badge
                        variant={isAvailable ? "default" : "destructive"}
                        className="text-sm"
                      >
                        {isAvailable ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {cantidadDisponible} {producto.unidad_venta || "unidad"}{" "}
                        (as)
                      </Badge>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-green-600">
              {cliente?.pais?.simbolo_moneda || "$"}
              {precio}
            </span>

            <Badge
              variant={isAvailable ? "default" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {isAvailable ? (
                <CheckCircle2 className="w-4 h-4 mr-1" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-1" />
              )}
              {isAvailable
                ? `Disponible (${cantidadDisponible} ${producto.unidad_venta || "unidad"})`
                : "Agotado"}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Cantidad</span>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrease}
                  disabled={quantity <= 1 || !sucursalId}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="text-xl font-bold min-w-[3rem] text-center">
                  {quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncrease}
                  disabled={
                    !isAvailable ||
                    quantity >= cantidadDisponible ||
                    !sucursalId
                  }
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notas" className="text-lg font-semibold">
                Notas para este producto
              </label>
              <Input
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Agregar notas especiales..."
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">
                  {quantity} {quantity === 1 ? "producto" : "productos"}
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {cliente?.pais?.simbolo_moneda || "$"}
                  {totalPrecio.toFixed(2)}
                </span>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={`flex-1 max-w-[60px] transition-all duration-300 ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                      : "hover:bg-red-50 hover:text-red-600"
                  }`}
                  onClick={handleToggleFavorite}
                  title={
                    isFavorite ? "Remover de favoritos" : "Agregar a favoritos"
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </Button>

                <Button
                  disabled={!isAvailable || !sucursalId}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {!sucursalId
                    ? "Selecciona una sucursal"
                    : "Agregar al carrito"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Detalles del producto</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Unidad de medida:</span>
                <span className="font-semibold">
                  {producto.unidad_venta || "No especificada"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sucursal seleccionada:</span>
                <span className="font-semibold">
                  {nombreSucursal || "No seleccionada"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cantidad disponible:</span>
                <span className="font-semibold">
                  {sucursalId
                    ? isLoadingExistencia
                      ? "Cargando..."
                      : `${cantidadDisponible} ${producto.unidad_venta || "unidad"}  (as)`
                    : "Selecciona una sucursal"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <Badge variant={isAvailable ? "default" : "destructive"}>
                  {!sucursalId
                    ? "Selecciona sucursal"
                    : isAvailable
                      ? "Disponible"
                      : "Agotado"}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">En favoritos:</span>
                <Badge variant={isFavorite ? "default" : "outline"}>
                  {isFavorite ? "Sí" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProductosRelacionados
        categoriaId={producto.categoria.id}
        producto={producto.id}
        tipo={producto.categoria.tipo}
      />
    </div>
  );
};

export default ProductDetailsPage;
