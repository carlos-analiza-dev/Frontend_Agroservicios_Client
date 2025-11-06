"use client";
import useGetPedidosCliente from "@/hooks/pedidos/useGetPedidosCliente";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { ShoppingCart, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/providers/store/useAuthStore";
import { EstadoPedido } from "@/api/pedidos/interface/crear-pedido.interface";
import PedidosSkeleton from "@/components/pedidos/PedidosSkeleton";
import PedidoCard from "@/components/pedidos/PedidoCard";
import { PedidosPagination } from "@/components/pedidos/PedidosPagination";

const ITEMS_PER_PAGE = 5;

const PedidosPage = () => {
  const { cliente } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: pedidosData,
    isLoading,
    error,
  } = useGetPedidosCliente(
    ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE,
    EstadoPedido.PENDIENTE
  );

  const totalPages = Math.ceil((pedidosData?.total || 0) / ITEMS_PER_PAGE);

  if (isLoading) {
    return <PedidosSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Error al cargar pedidos
        </h2>
        <p className="text-gray-600">
          No se pudieron cargar los pedidos. Intente nuevamente.
        </p>
        <Button onClick={() => setCurrentPage(1)} className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!pedidosData?.pedidos?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No hay pedidos
        </h2>
        <p className="text-gray-600">Aún no has realizado ningún pedido.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-gray-600">
          Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, pedidosData.total)} de{" "}
          {pedidosData.total} pedidos
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {pedidosData.pedidos.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido} cliente={cliente} />
        ))}
      </div>

      {totalPages > 1 && (
        <PedidosPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PedidosPage;
