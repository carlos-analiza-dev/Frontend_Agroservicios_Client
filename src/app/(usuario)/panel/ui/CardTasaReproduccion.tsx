import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  porcentajeNacidos: number;
  totalNacidos: number;
  totalOrigen: number;
}

const CardTasaReproduccion = ({
  porcentajeNacidos,
  totalNacidos,
  totalOrigen,
}: Props) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Tasa de Reproducción</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-blue-600">
              {porcentajeNacidos.toFixed(1)}%
            </div>
            <p className="text-sm text-blue-600">
              {totalNacidos} de {totalOrigen} animales son nacidos en la finca
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-blue-800">
              Autosuficiencia
            </div>
            <p className="text-sm text-blue-600">
              {porcentajeNacidos >= 50 ? "Alta" : "Baja"} capacidad de
              reproducción
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTasaReproduccion;
