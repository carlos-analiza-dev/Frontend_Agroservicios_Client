"use client";

import { calidadesMiel } from "@/helpers/data/dataProduccionFinca";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Flower2,
  Droplets,
  Sun,
  FlaskConical,
  Leaf,
  Calculator,
  Calendar,
  Scale,
  Flower,
} from "lucide-react";
import { CreateProduccionFinca } from "@/api/produccion/interface/crear-produccion-finca.interface";

interface ApiculturaSectionProps {
  control: Control<CreateProduccionFinca>;
}

const ApiculturaSection: React.FC<ApiculturaSectionProps> = ({ control }) => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b">
        <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Flower2 className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <div>Producción Apícola</div>
            <Badge
              variant="secondary"
              className="mt-1 bg-amber-100 text-amber-800"
            >
              <FlaskConical className="h-3 w-3 mr-1" />
              Gestión de colmenas y miel
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="numero-colmenas"
                className="text-base font-semibold flex items-center gap-2"
              >
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <Calculator className="h-4 w-4 text-blue-600" />
                </div>
                Número de colmenas
              </Label>
              <Controller
                control={control}
                name="apicultura.numero_colmenas"
                render={({ field }) => (
                  <Input
                    id="numero-colmenas"
                    type="number"
                    placeholder="Ej: 25"
                    value={field.value?.toString() || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="text-lg py-6"
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">
                Total de colmenas activas en producción
              </p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="frecuencia-cosecha"
                className="text-base font-semibold flex items-center gap-2"
              >
                <div className="p-1.5 bg-green-100 rounded-md">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                Frecuencia de cosecha
              </Label>
              <Controller
                control={control}
                name="apicultura.frecuencia_cosecha"
                render={({ field }) => (
                  <Input
                    id="frecuencia-cosecha"
                    placeholder="Ej: Cada 2 meses, Trimestral, Anual..."
                    value={field.value || ""}
                    onChange={field.onChange}
                    className="py-6"
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">
                Periodicidad con la que realiza la cosecha de miel
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="cantidad-cosecha"
                className="text-base font-semibold flex items-center gap-2"
              >
                <div className="p-1.5 bg-orange-100 rounded-md">
                  <Scale className="h-4 w-4 text-orange-600" />
                </div>
                Cantidad por cosecha (kg)
              </Label>
              <Controller
                control={control}
                name="apicultura.cantidad_por_cosecha"
                render={({ field }) => (
                  <Input
                    id="cantidad-cosecha"
                    type="number"
                    step="0.01"
                    placeholder="Ej: 150.75"
                    value={field.value?.toString() || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="text-lg py-6"
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">
                Peso promedio obtenido por cada cosecha
              </p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="calidad-miel"
                className="text-base font-semibold flex items-center gap-2"
              >
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Flower className="h-4 w-4 text-purple-600" />
                </div>
                Calidad de la miel
              </Label>
              <Controller
                control={control}
                name="apicultura.calidad_miel"
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="calidad-miel" className="py-6">
                      <SelectValue placeholder="Seleccione la calidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {calidadesMiel.map((calidad) => (
                        <SelectItem
                          key={calidad}
                          value={calidad}
                          className="py-3"
                        >
                          <div className="flex items-center gap-2">
                            <Flower className="h-4 w-4 text-amber-500" />
                            {calidad}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-sm text-muted-foreground">
                Clasificación según estándares de calidad
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <Droplets className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">
                Información sobre producción apícola
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                La producción apícola incluye el manejo de colmenas, cosecha de
                miel y otros productos derivados como polen, propóleos y cera de
                abejas.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiculturaSection;
