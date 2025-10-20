import { EditarPedido } from "@/api/pedidos/accions/editar-pedido";
import {
  CrearPedidoInterface,
  EstadoPedido,
} from "@/api/pedidos/interface/crear-pedido.interface";
import { Pedido } from "@/api/pedidos/interface/response-pedidos.interface";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/helpers/funciones/formatCurrency";
import { formatDate } from "@/helpers/funciones/formatDate";
import { Cliente } from "@/interfaces/auth/cliente";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, MapPin, Package } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  pedido: Pedido;
  cliente: Cliente | undefined;
}

const PedidoCard = ({ pedido, cliente }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const simbolo = cliente?.pais.simbolo_moneda || "$";

  const getEstadoBadge = (estado: string) => {
    const estados = {
      pendiente: { label: "Pendiente", variant: "secondary" as const },
      procesado: { label: "Procesado", variant: "default" as const },
      facturado: { label: "Facturado", variant: "default" as const },
      cancelado: { label: "Cancelado", variant: "destructive" as const },
    };

    const estadoConfig =
      estados[estado as keyof typeof estados] || estados.pendiente;

    return <Badge variant={estadoConfig.variant}>{estadoConfig.label}</Badge>;
  };

  const mutationEdit = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CrearPedidoInterface>;
    }) => EditarPedido(id, data),
  });

  const handleCancelarPedido = () => {
    if (!pedido.id) return;

    mutationEdit.mutate(
      { id: pedido.id, data: { estado: EstadoPedido.CANCELADO } },
      {
        onSuccess: () => {
          toast.success("Pedido cancelado correctamente");
          setIsOpen(false);
          queryClient.invalidateQueries({ queryKey: ["pedidos-cliente"] });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error al cancelar el pedido"
          );
        },
      }
    );
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">
                  Pedido #{pedido.id.slice(-8)}
                </CardTitle>
                {getEstadoBadge(pedido.estado)}
              </div>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(pedido.created_at)}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(pedido.total, simbolo)}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Sucursal</h3>
                  <p className="text-sm text-gray-600">
                    {pedido.sucursal.nombre}
                  </p>
                  <p className="text-sm text-gray-500">
                    {pedido.sucursal.direccion_complemento}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Productos ({pedido.detalles.length})
              </h3>

              <div className="space-y-3">
                {pedido.detalles.map((detalle: any) => (
                  <div
                    key={detalle.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {detalle.producto.nombre}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {detalle.producto.atributos && (
                          <span className="block text-xs">
                            {detalle.producto.atributos}
                          </span>
                        )}
                        <span>Código: {detalle.producto.codigo}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                          {detalle.cantidad} x{" "}
                          {formatCurrency(detalle.precio, simbolo)}
                        </div>
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(detalle.total, simbolo)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(pedido.total, simbolo)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(pedido.total, simbolo)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            {pedido.estado === "pendiente" && (
              <Button
                onClick={() => setIsOpen(true)}
                variant="destructive"
                size="sm"
              >
                Cancelar Pedido
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <div className="flex justify-end">
            <AlertDialogCancel className="rounded-full p-1 hover:bg-muted">
              ✕
            </AlertDialogCancel>
          </div>

          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-destructive">
              ¿Cancelar pedido?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Esta acción{" "}
              <span className="font-semibold">no se puede deshacer</span>. Si
              cancelas este pedido, se perderán todos los detalles asociados.
              ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4 flex justify-end gap-3">
            <AlertDialogCancel className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition">
              No, volver
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 rounded-md bg-destructive text-white hover:bg-destructive/90 transition"
              onClick={handleCancelarPedido}
            >
              Sí, cancelar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PedidoCard;
