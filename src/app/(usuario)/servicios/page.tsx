"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MessageError } from "@/components/generics/MessageError";
import useGetServiciosActivos from "@/hooks/servicios/useGetServiciosActivos";
import CardServiceUsers from "./ui/CardServiceUsers";

const ServicesUser = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: servicios,
    isError,
    isLoading,
    refetch,
  } = useGetServiciosActivos();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading && !refreshing) {
    return (
      <div className="flex-1 w-full flex justify-center items-center">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex justify-center p-5 w-full">
        <MessageError
          titulo="Error al cargar servicios"
          descripcion="Ocurrió un problema al obtener los servicios. Por favor, inténtalo de nuevo más tarde."
          onPress={() => onRefresh()}
        />
      </div>
    );
  }

  if (servicios?.length === 0) {
    return (
      <div className="flex-1 flex justify-center p-5 w-full">
        <MessageError
          titulo="No hay servicios disponibles"
          descripcion="Actualmente no hay servicios activos. Por favor, verifica más tarde."
          onPress={() => onRefresh()}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      <div className="px-4 pb-8 pt-5">
        <div className="mb-5 text-center w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Nuestros servicios
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-[90%] mx-auto">
            Selecciona un servicio para agendar una cita
          </p>
        </div>

        <div className="space-y-4">
          {servicios?.map((item) => (
            <div key={item.id} className="w-full">
              <CardServiceUsers
                services={item}
                onPress={() =>
                  router.push(
                    `/servicios/${item.id}?nombre=${encodeURIComponent(item.nombre)}`
                  )
                }
              />
            </div>
          ))}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
};

export default ServicesUser;
