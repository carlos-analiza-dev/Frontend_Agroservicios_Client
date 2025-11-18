"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, DollarSign, Pencil } from "lucide-react";
import { Alternativa } from "@/api/produccion/interface/obter-producciones-userId.interface";
import { Button } from "@/components/ui/button";

interface ProduccionAlternativaCardProps {
  alternativa: Alternativa;
  handleProduccionAlternativa: (alternativa: Alternativa) => void;
}

const ProduccionAlternativaCard: React.FC<ProduccionAlternativaCardProps> = ({
  alternativa,
  handleProduccionAlternativa,
}) => {
  if (!alternativa.actividades || alternativa.actividades.length === 0) {
    return null;
  }

  const totalIngresos = alternativa.actividades.reduce(
    (sum, actividad) => sum + (actividad.ingresos_anuales || 0),
    0
  );

  return (
    <Card className="w-full">
      <div className="flex justify-end mt-4 p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleProduccionAlternativa(alternativa)}
        >
          <Pencil className="h-4 w-4 mr-1" /> Editar Alternativa
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">Actividades Alternativas</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{alternativa.actividades.length} actividades</span>
                {totalIngresos > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />L{" "}
                      {totalIngresos.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-1">
              Diversificado
            </Badge>
            <div className="text-xs text-muted-foreground">
              {alternativa.actividades.length} tipos
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {alternativa.actividades.slice(0, 3).map((actividad, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {actividad.tipo}
            </Badge>
          ))}
          {alternativa.actividades.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{alternativa.actividades.length - 3} más
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProduccionAlternativaCard;
