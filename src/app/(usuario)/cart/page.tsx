"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/providers/store/useAuthStore";
import { useCartStore } from "@/providers/store/useCartStore";
import { CrearPedido } from "@/api/pedidos/accions/crear-pedido";
import {
  EstadoPedido,
  CrearPedidoInterface,
} from "@/api/pedidos/interface/crear-pedido.interface";
import { toast } from "react-toastify";
import { Loader2, ShoppingCart } from "lucide-react";
import CardCarrito from "./ui/CardCarrito";
import ResumenPedido from "./ui/ResumenPedido";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const CarritoPage = () => {
  const router = useRouter();
  const { cliente } = useAuthStore();
  const {
    cart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();
  const queryClient = useQueryClient();
  const crearPedidoMutation = useMutation({
    mutationFn: async (pedidosData: CrearPedidoInterface[]) => {
      const promises = pedidosData.map((pedidoData) => CrearPedido(pedidoData));
      return await Promise.all(promises);
    },
    onSuccess: () => {
      clearCart();

      queryClient.invalidateQueries({ queryKey: ["pedidos-cliente"] });

      toast.success("¡Pedido realizado con éxito!");
      router.push("/pedidos");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error al realizar el pedido";
        toast.error(errorMessage);
      }
    },
  });

  const handleContinueShopping = () => {
    router.push("/productos");
  };

  const handleCheckout = () => {
    if (!cliente) {
      toast.error("Debes iniciar sesión para realizar un pedido");
      router.push("/auth/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    const itemsPorSucursal = cart.reduce(
      (acc, item) => {
        const sucursalId = item.sucursalId || "default";
        if (!acc[sucursalId]) {
          acc[sucursalId] = {
            sucursalId: sucursalId,
            nombreSucursal: item.nombreSucursal || "Sucursal Principal",
            items: [],
          };
        }
        acc[sucursalId].items.push(item);
        return acc;
      },
      {} as Record<
        string,
        { sucursalId: string; nombreSucursal: string; items: any[] }
      >
    );

    const pedidosData = Object.values(itemsPorSucursal).map((grupoSucursal) => {
      const detalles = grupoSucursal.items.map((item) => {
        const precio = parseFloat(item.preciosPorPais?.[0]?.precio || "0");
        return {
          id_producto: item.id,
          cantidad: item.quantity,
          precio: precio,
          total: precio * item.quantity,
        };
      });

      const totalPedido = detalles.reduce(
        (sum, detalle) => sum + detalle.total,
        0
      );

      const pedidoData: CrearPedidoInterface = {
        id_cliente: cliente.id,
        id_sucursal:
          grupoSucursal.sucursalId === "default"
            ? undefined
            : grupoSucursal.sucursalId,
        total: totalPedido,
        estado: EstadoPedido.PENDIENTE,
        detalles: detalles,
      };

      return pedidoData;
    });

    crearPedidoMutation.mutate(pedidosData);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 mb-8">
          Agrega algunos productos para comenzar a comprar
        </p>
        <Button onClick={handleContinueShopping} size="lg">
          Explorar Productos
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
        <p className="text-gray-600 mt-2">
          Revisa y gestiona los productos en tu carrito
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CardCarrito
              key={`${item.id}-${item.sucursalId}`}
              item={item}
              cliente={cliente}
              removeFromCart={removeFromCart}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <ResumenPedido
            totalItems={totalItems}
            cliente={cliente}
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
            handleContinueShopping={handleContinueShopping}
            isProcessing={crearPedidoMutation.isPending}
          />
        </div>
      </div>

      {crearPedidoMutation.isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Procesando Pedido</h3>
            <p className="text-gray-600">
              Estamos creando tu pedido, por favor espera...
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
