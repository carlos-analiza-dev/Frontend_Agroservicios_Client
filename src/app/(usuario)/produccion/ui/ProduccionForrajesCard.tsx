"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sprout, Calendar, Clock, Scale, Wheat, Leaf } from "lucide-react";
import { ForrajesInsumo } from "@/api/produccion/interface/obter-producciones-userId.interface";

interface ProduccionForrajesCardProps {
  forrajesInsumo: ForrajesInsumo;
}

const ProduccionForrajesCard: React.FC<ProduccionForrajesCardProps> = ({
  forrajesInsumo,
}) => {
  const getInsumoIcon = (tipo: string) => {
    switch (tipo) {
      case "Heno":
        return Wheat;
      case "Silo":
        return Sprout;
      case "Pasto":
      case "Harina":
      case "Alimentos Concentrados elaborados":
        return Sprout;
      default:
        return Leaf;
    }
  };

  const getInsumoColor = (tipo: string) => {
    switch (tipo) {
      case "Heno":
        return "bg-green-100 text-green-800 border-green-200";
      case "Silo":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pasto":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Harina":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Alimentos Concentrados elaborados":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!forrajesInsumo.insumos || forrajesInsumo.insumos.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Leaf className="h-5 w-5 text-primary" />
          Forrajes e Insumos
          <Badge variant="secondary" className="ml-2">
            {forrajesInsumo.insumos.length} insumo
            {forrajesInsumo.insumos.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {forrajesInsumo.insumos.map((insumo, index) => {
          const IconComponent = getInsumoIcon(insumo.tipo);

          return (
            <div key={index} className="space-y-3">
              {index > 0 && <Separator />}

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-base">{insumo.tipo}</h3>
                  <Badge
                    variant="outline"
                    className={getInsumoColor(insumo.tipo)}
                  >
                    {insumo.tipo}
                  </Badge>
                </div>

                {insumo.tipo === "Heno" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ml-7">
                    {insumo.tipo_heno && (
                      <div className="flex items-center gap-2">
                        <Wheat className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Tipo de heno:</span>
                          <span className="text-muted-foreground ml-1">
                            {insumo.tipo_heno}
                          </span>
                        </div>
                      </div>
                    )}

                    {insumo.estacionalidad_heno && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Estacionalidad:</span>
                          <span className="text-muted-foreground ml-1">
                            {insumo.estacionalidad_heno}
                          </span>
                        </div>
                      </div>
                    )}

                    {insumo.meses_produccion_heno &&
                      insumo.meses_produccion_heno.length > 0 && (
                        <div className="md:col-span-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              Meses de producción:
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {insumo.meses_produccion_heno.map((mes, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs"
                              >
                                {mes}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {insumo.tipo === "Silo" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ml-7">
                    {insumo.produccion_manzana && (
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Producción:</span>
                          <span className="text-muted-foreground ml-1">
                            {insumo.produccion_manzana}
                          </span>
                        </div>
                      </div>
                    )}

                    {insumo.tiempo_estimado_cultivo && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Tiempo estimado:</span>
                          <span className="text-muted-foreground ml-1">
                            {insumo.tiempo_estimado_cultivo}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {insumo.tipo !== "Heno" && insumo.tipo !== "Silo" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ml-7">
                    {insumo.produccion_manzana && (
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Producción:</span>
                          <span className="text-muted-foreground ml-1">
                            {insumo.produccion_manzana}
                          </span>
                        </div>
                      </div>
                    )}

                    {insumo.tiempo_estimado_cultivo && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Tiempo estimado:</span>
                          <span className="text-muted-foreground ml-1">
                            {insumo.tiempo_estimado_cultivo}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ProduccionForrajesCard;
