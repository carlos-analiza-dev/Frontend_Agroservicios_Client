"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  MapPin,
  Home,
  DollarSign,
  Layers,
  Factory,
  Tractor,
  Beef,
} from "lucide-react";
import { ObtenerProduccionByUserInterface } from "@/api/produccion/interface/obter-producciones-userId.interface";
import ProduccionGanaderaCard from "./ProduccionGanaderaCard";
import ProduccionForrajesCard from "./ProduccionForrajesCard";
import ProduccionAgricolaCard from "./ProduccionAgricolaCard";
import ProduccionApiculturaCard from "./ProduccionApiculturaCard";
import ProduccionAlternativaCard from "./ProduccionAlternativaCard";
import Link from "next/link";

interface ProduccionGanaderaCardProps {
  produccion: ObtenerProduccionByUserInterface;
}

const ProduccionList: React.FC<ProduccionGanaderaCardProps> = ({
  produccion,
}) => {
  const {
    finca,
    ganadera,
    agricola,
    alternativa,
    apicultura,
    forrajesInsumo,
    consumo_propio,
    produccion_mixta,
    produccion_venta,
    transformacion_artesanal,
  } = produccion;

  const hasProductionData =
    ganadera || agricola || alternativa || apicultura || forrajesInsumo;

  return (
    <Card className="w-full max-w-4xl mx-auto mb-4 shadow-sm border-l-4 border-l-primary hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <Tractor className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-bold text-foreground">
                {finca.nombre_finca}
              </CardTitle>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Beef className="h-3 w-3" />
                <span>{finca.cantidad_animales} animales</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{finca.area_ganaderia_hectarea} ha</span>
              </Badge>
            </div>
          </div>
          <div>
            <Link
              className="hover:underline hover:text-blue-600"
              href={`/produccion/${produccion.id}`}
            >
              Ver
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Separator className="mb-4" />

        <div className="space-y-4">
          {ganadera && (
            <div>
              <ProduccionGanaderaCard ganadera={ganadera} finca={finca} />
              <Separator className="mt-4" />
            </div>
          )}

          {forrajesInsumo && (
            <div>
              <ProduccionForrajesCard forrajesInsumo={forrajesInsumo} />
              <Separator className="mt-4" />
            </div>
          )}

          {agricola && (
            <div>
              <ProduccionAgricolaCard agricola={agricola} />
              <Separator className="mt-4" />
            </div>
          )}

          {apicultura && (
            <div>
              <ProduccionApiculturaCard apicultura={apicultura} />
              <Separator className="mt-4" />
            </div>
          )}

          {alternativa && (
            <div>
              <ProduccionAlternativaCard alternativa={alternativa} />
              <Separator className="mt-4" />
            </div>
          )}

          {!hasProductionData && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No hay datos de producción registrados para esta finca.</p>
            </div>
          )}
        </div>

        {(consumo_propio ||
          produccion_venta ||
          produccion_mixta ||
          transformacion_artesanal) && (
          <>
            <Separator className="my-4" />
            <div className="flex flex-wrap gap-2">
              {consumo_propio && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Home className="h-3 w-3" />
                  Consumo propio
                </Badge>
              )}
              {produccion_venta && (
                <Badge variant="default" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Producción para venta
                </Badge>
              )}
              {produccion_mixta && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  Producción mixta
                </Badge>
              )}
              {transformacion_artesanal && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Factory className="h-3 w-3" />
                  Transformación artesanal
                </Badge>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProduccionList;
