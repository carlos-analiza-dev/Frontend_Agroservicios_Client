"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/store/useAuthStore";
import { useCartStore } from "@/providers/store/useCartStore";
import CardCarrito from "./ui/CardCarrito";
import ResumenPedido from "./ui/ResumenPedido";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();
  const { cliente } = useAuthStore();
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/productos");
  };

  const handleCheckout = () => {
    console.log("Proceder al checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/productos")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </Button>

        <div className="text-center py-16">
          <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-6">
            Agrega algunos productos para continuar
          </p>
          <Button
            onClick={handleContinueShopping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Comenzar a comprar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">
            Carrito de Compras
          </h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {totalItems()} {totalItems() === 1 ? "producto" : "productos"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CardCarrito
              key={item.id}
              item={item}
              cliente={cliente}
              removeFromCart={removeFromCart}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
            />
          ))}

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar carrito
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <ResumenPedido
            totalItems={totalItems}
            cliente={cliente}
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
            handleContinueShopping={handleContinueShopping}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
