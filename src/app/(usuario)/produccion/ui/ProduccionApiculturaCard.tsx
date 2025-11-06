"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bug, Pencil, Scale } from "lucide-react";
import {
  Apicultura,
  ObtenerProduccionByUserInterface,
} from "@/api/produccion/interface/obter-producciones-userId.interface";
import { Button } from "@/components/ui/button";

interface ProduccionApiculturaCardProps {
  apicultura: ObtenerProduccionByUserInterface["apicultura"];
  handleProduccionApicultura: (apicultura: Apicultura) => void;
}

const ProduccionApiculturaCard: React.FC<ProduccionApiculturaCardProps> = ({
  apicultura,
  handleProduccionApicultura,
}) => {
  if (!apicultura) return null;

  return (
    <Card className="w-full">
      <div className="flex justify-end mt-4 p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleProduccionApicultura(apicultura)}
        >
          <Pencil className="h-4 w-4 mr-1" /> Editar Apicultura
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bug className="h-5 w-5 text-amber-600" />
            <div>
              <h3 className="font-semibold">Apicultura</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{apicultura.numero_colmenas} colmenas</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Scale className="h-3 w-3" />
                  {apicultura.cantidad_por_cosecha} kg/cosecha
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-1">
              {apicultura.frecuencia_cosecha}
            </Badge>
            <div className="text-xs text-muted-foreground">
              {apicultura.calidad_miel}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProduccionApiculturaCard;
