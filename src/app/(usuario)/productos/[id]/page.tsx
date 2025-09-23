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
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/providers/store/useAuthStore";
import useGetProductoById from "@/hooks/productos/useGetProductoById";
import { toast } from "react-toastify";
import { MessageError } from "@/components/generics/MessageError";

const ProductDetailsPage = () => {
  const { id: productoId } = useParams();
  const { cliente } = useAuthStore();

  const {
    data: producto,
    isError,
    isLoading,
    refetch,
  } = useGetProductoById(productoId as string);

  // Función para obtener el precio seguro
  const getPrecio = () => {
    if (!producto?.preciosPorPais || producto.preciosPorPais.length === 0) {
      return "0.00";
    }
    return producto.preciosPorPais[0].precio || "0.00";
  };

  // Función para obtener la cantidad disponible segura
  const getCantidadDisponible = () => {
    return 0;
  };

  const [quantity, setQuantity] = useState(1);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [notas, setNotas] = useState("");

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
    await refetch();
  }, [refetch]);

  /*   const handleAddToCart = () => {
    if (!producto) {
      toast.error("No se pudo obtener la información del producto");
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.productoId === producto.id && !item.fincaId
    );

    addItem(
      {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: Number(getPrecio()),
        notas: notas,
        imagen:
          "https://static.wikia.nocookie.net/marketingandbusinessbyjd/images/a/a9/Producto_wikia.png/revision/latest?cb=20181002144352&path-prefix=es",
        unidad_venta: producto.unidad_venta,
      },
      quantity
    );

    toast(
      existingItem
        ? `${quantity} ${producto.nombre} agregados a la cantidad existente`
        : `${quantity} ${producto.nombre} agregado al carrito`
    );

    setQuantity(1);
    setTotalPrecio(0);
    setNotas("");
  }; */

  useEffect(() => {
    const precio = getPrecio();
    const total = quantity * Number(precio);
    setTotalPrecio(total);
  }, [quantity, producto]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !producto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MessageError
          titulo="No se encontró el producto seleccionado"
          descripcion="Ocurrió un error al momento de cargar el producto"
          onPress={onRefresh}
        />
      </div>
    );
  }

  const isAvailable = producto.disponible;
  const cantidadDisponible = getCantidadDisponible();
  const precio = getPrecio();

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src="https://static.wikia.nocookie.net/marketingandbusinessbyjd/images/a/a9/Producto_wikia.png/revision/latest?cb=20181002144352&path-prefix=es"
              alt={producto.nombre || "Producto"}
              fill
              className="object-contain"
            />
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {producto.nombre || "Nombre no disponible"}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {producto.descripcion || "Sin descripción disponible"}
            </p>
          </div>

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
                  disabled={quantity <= 1}
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
                  disabled={!isAvailable || quantity >= cantidadDisponible}
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
                  className="flex-1 max-w-[60px]"
                >
                  <Heart className="h-5 w-5" />
                </Button>

                <Button
                  /* onClick={handleAddToCart} */
                  disabled={!isAvailable}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al carrito
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
                <span className="text-gray-600">Cantidad disponible:</span>
                <span className="font-semibold">
                  {cantidadDisponible} {producto.unidad_venta || "unidad"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <Badge variant={isAvailable ? "default" : "destructive"}>
                  {isAvailable ? "Disponible" : "Agotado"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
