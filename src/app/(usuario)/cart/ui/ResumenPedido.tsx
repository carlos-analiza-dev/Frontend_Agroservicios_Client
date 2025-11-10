import { TipoEntrega } from "@/api/pedidos/interface/crear-pedido.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cliente } from "@/interfaces/auth/cliente";
import { Loader2, MapPin, Truck, Store, Info } from "lucide-react";
import React from "react";
import { useCartStore } from "@/providers/store/useCartStore";

interface UbicacionPedido {
  tipo: "finca" | "sucursal" | "otra";
  fincaId?: string;
  tipoEntrega: TipoEntrega;
  costoDelivery?: number;
  direccion_entrega?: string;
  latitud?: number;
  longitud?: number;
  nombre_finca?: string;
}

interface Props {
  totalItems: () => number;
  cliente: Cliente | undefined;
  totalPrice: () => number;
  handleCheckout: (ubicacion: UbicacionPedido) => void;
  handleContinueShopping: () => void;
  isProcessing?: boolean;
  ubicacionSeleccionada?: UbicacionPedido | null;
  onSeleccionarUbicacion: () => void;
}

const ResumenPedido = ({
  totalItems,
  cliente,
  totalPrice,
  handleCheckout,
  handleContinueShopping,
  isProcessing = false,
  ubicacionSeleccionada,
  onSeleccionarUbicacion,
}: Props) => {
  const { calcularImpuestos } = useCartStore();
  const impuestos = calcularImpuestos();

  const costoDelivery = ubicacionSeleccionada?.costoDelivery || 0;

  const precioTotal = impuestos.total_general + costoDelivery;

  const obtenerTextoUbicacion = () => {
    if (!ubicacionSeleccionada) return "No seleccionada";

    switch (ubicacionSeleccionada.tipo) {
      case "finca":
        return `Finca: ${ubicacionSeleccionada.nombre_finca || "Seleccionada"}`;
      case "sucursal":
        return "Recoger en sucursal";
      default:
        return "No seleccionada";
    }
  };

  const obtenerTextoTipoEntrega = () => {
    if (!ubicacionSeleccionada) return "";

    return ubicacionSeleccionada.tipoEntrega === "delivery"
      ? "Delivery a domicilio"
      : "Recoger en sucursal";
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-xl">Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Ubicación:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSeleccionarUbicacion}
              className="h-auto p-1"
            >
              {ubicacionSeleccionada ? "Cambiar" : "Seleccionar"}
            </Button>
          </div>

          {ubicacionSeleccionada ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{obtenerTextoUbicacion()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {ubicacionSeleccionada.tipoEntrega === "delivery" ? (
                  <Truck className="h-4 w-4" />
                ) : (
                  <Store className="h-4 w-4" />
                )}
                <span>{obtenerTextoTipoEntrega()}</span>
              </div>
              {ubicacionSeleccionada.direccion_entrega && (
                <div className="text-xs text-gray-600 mt-1">
                  {ubicacionSeleccionada.direccion_entrega}
                </div>
              )}
              {ubicacionSeleccionada.costoDelivery &&
                ubicacionSeleccionada.costoDelivery > 0 && (
                  <div className="text-sm text-orange-600 font-medium">
                    Delivery: +{cliente?.pais?.simbolo_moneda || "$"}
                    {ubicacionSeleccionada.costoDelivery.toFixed(2)}
                  </div>
                )}
            </div>
          ) : (
            <p className="text-sm text-red-600">
              Debes seleccionar una ubicación para continuar
            </p>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">
              {cliente?.pais?.simbolo_moneda || "$"}
              {impuestos.sub_total.toFixed(2)}
            </span>
          </div>

          {impuestos.importe_exento > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Exento:</span>
              <span className="text-green-600">
                -{cliente?.pais?.simbolo_moneda || "$"}
                {impuestos.importe_exento.toFixed(2)}
              </span>
            </div>
          )}

          {impuestos.importe_exonerado > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Exonerado:</span>
              <span className="text-green-600">
                -{cliente?.pais?.simbolo_moneda || "$"}
                {impuestos.importe_exonerado.toFixed(2)}
              </span>
            </div>
          )}

          {impuestos.importe_gravado_15 > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base 15%:</span>
              <span>
                {cliente?.pais?.simbolo_moneda || "$"}
                {impuestos.importe_gravado_15.toFixed(2)}
              </span>
            </div>
          )}

          {impuestos.isv_15 > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ISV 15%:</span>
              <span className="text-red-600">
                +{cliente?.pais?.simbolo_moneda || "$"}
                {impuestos.isv_15.toFixed(2)}
              </span>
            </div>
          )}

          {impuestos.importe_gravado_18 > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base 18%:</span>
              <span>
                {cliente?.pais?.simbolo_moneda || "$"}
                {impuestos.importe_gravado_18.toFixed(2)}
              </span>
            </div>
          )}

          {impuestos.isv_18 > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ISV 18%:</span>
              <span className="text-red-600">
                +{cliente?.pais?.simbolo_moneda || "$"}
                {impuestos.isv_18.toFixed(2)}
              </span>
            </div>
          )}

          {impuestos.total_impuestos > 0 && (
            <div className="flex justify-between text-sm font-medium pt-1 border-t">
              <span className="text-gray-700">Total Impuestos:</span>
              <span className="text-red-600">
                +{cliente?.pais?.simbolo_moneda || "$"}
                {impuestos.total_impuestos.toFixed(2)}
              </span>
            </div>
          )}

          {costoDelivery > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Costo de delivery:</span>
              <span className="font-semibold text-orange-600">
                +{cliente?.pais?.simbolo_moneda || "$"}
                {costoDelivery.toFixed(2)}
              </span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-600">
              {cliente?.pais?.simbolo_moneda || "$"}
              {precioTotal.toFixed(2)}
            </span>
          </div>

          {impuestos.total_impuestos > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Info className="h-3 w-3" />
              <span>Impuestos incluidos en el total</span>
            </div>
          )}
        </div>

        <Button
          onClick={() =>
            ubicacionSeleccionada && handleCheckout(ubicacionSeleccionada)
          }
          disabled={isProcessing || !ubicacionSeleccionada}
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
export type { UbicacionPedido };
