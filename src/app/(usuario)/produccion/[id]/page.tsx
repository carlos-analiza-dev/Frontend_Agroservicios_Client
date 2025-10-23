"use client";
import useGetProduccionById from "@/hooks/producciones/useGetProduccionById";
import { useParams } from "next/navigation";
import React from "react";

const DetalleProduccionPage = () => {
  const params = useParams();
  const produccionId = params.id as string;
  const { data: produccion } = useGetProduccionById(produccionId);

  return <div>DetalleProduccionPage</div>;
};

export default DetalleProduccionPage;
