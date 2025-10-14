"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Beef } from "lucide-react";
import { ObtenerProduccionByUserInterface } from "@/api/produccion/interface/obter-producciones-userId.interface";

interface ProduccionGanaderaCardProps {
  ganadera: ObtenerProduccionByUserInterface["ganadera"];
  finca: ObtenerProduccionByUserInterface["finca"];
}

const ProduccionGanaderaCard: React.FC<ProduccionGanaderaCardProps> = ({
  ganadera,
  finca,
}) => {
  if (!ganadera) return null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Beef className="h-5 w-5 text-primary" />
          Producción Ganadera
        </CardTitle>
        <div className="flex flex-wrap gap-1">
          {ganadera.tiposProduccion.map((tipo, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tipo}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {ganadera.vacasOrdeño}
            </div>
            <div className="text-xs text-muted-foreground">Vacas ordeño</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {ganadera.vacasSecas}
            </div>
            <div className="text-xs text-muted-foreground">Vacas secas</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {ganadera.terneros}
            </div>
            <div className="text-xs text-muted-foreground">Terneros</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {finca.cantidad_animales}
            </div>
            <div className="text-xs text-muted-foreground">Total animales</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ganadera.produccionLecheCantidad && (
            <div className="border rounded-lg p-3 bg-blue-50">
              <div className="font-semibold text-blue-800">
                Producción Lechera
              </div>
              <div className="text-lg font-bold">
                {ganadera.produccionLecheCantidad}{" "}
                {ganadera.produccionLecheUnidad}
              </div>
            </div>
          )}

          {ganadera.cabezasEngordeBovino && (
            <div className="border rounded-lg p-3 bg-red-50">
              <div className="font-semibold text-red-800">Carne en Engorde</div>
              <div className="text-lg font-bold">
                {ganadera.cabezasEngordeBovino} cabezas
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>Área: {finca.area_ganaderia_hectarea} ha</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{finca.cantidad_animales} animales</span>
          </div>
        </div>

        {finca.especies_maneja && finca.especies_maneja.length > 0 && (
          <div>
            <div className="font-medium text-sm mb-2">Especies:</div>
            <div className="flex flex-wrap gap-1">
              {finca.especies_maneja.map((especie, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {especie.especie} ({especie.cantidad})
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProduccionGanaderaCard;
