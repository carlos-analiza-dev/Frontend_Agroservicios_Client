import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cliente } from "@/interfaces/auth/cliente";
import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  totalItems: () => number;
  cliente: Cliente | undefined;
  totalPrice: () => number;
  handleCheckout: () => void;
  handleContinueShopping: () => void;
  isProcessing?: boolean;
}

const ResumenPedido = ({
  totalItems,
  cliente,
  totalPrice,
  handleCheckout,
  handleContinueShopping,
  isProcessing = false,
}: Props) => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-xl">Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Productos ({totalItems()}):</span>
            <span className="font-semibold">
              {cliente?.pais?.simbolo_moneda || "$"}
              {totalPrice().toFixed(2)}
            </span>
          </div>

          <div className="flex justify-center my-2">
            <p className="bg-red-100 text-red-700 font-semibold text-sm px-3 py-1 rounded-md text-center">
              Recoger los productos en la sucursal
            </p>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-600">
              {cliente?.pais?.simbolo_moneda || "$"}
              {totalPrice().toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Procesando...
            </>
          ) : (
            "Realizar Pedido"
          )}
        </Button>

        <Button
          onClick={handleContinueShopping}
          variant="outline"
          className="w-full"
          disabled={isProcessing}
        >
          Seguir comprando
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumenPedido;
