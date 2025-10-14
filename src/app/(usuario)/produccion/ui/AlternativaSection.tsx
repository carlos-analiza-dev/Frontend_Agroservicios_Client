"use client";

import React from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFormWatch,
} from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Activity, DollarSign } from "lucide-react";
import { CreateProduccionFinca } from "@/api/produccion/interface/crear-produccion-finca.interface";

interface AlternativaSectionProps {
  control: Control<CreateProduccionFinca>;
  fields: FieldArrayWithId<
    CreateProduccionFinca,
    "alternativa.actividades",
    "id"
  >[];
  append: (obj: {
    tipo: string;
    cantidad_producida: string;
    unidad_medida: string;
    ingresos_anuales?: number;
  }) => void;
  remove: (index: number) => void;
  watch: UseFormWatch<CreateProduccionFinca>;
}

const AlternativaSection: React.FC<AlternativaSectionProps> = ({
  control,
  fields,
  append,
  remove,
  watch,
}) => {
  const addNewActividad = () => {
    append({
      tipo: "",
      cantidad_producida: "",
      unidad_medida: "",
      ingresos_anuales: undefined,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Actividades Alternativas
          <Badge variant="secondary" className="ml-2">
            {fields.length} actividad{fields.length !== 1 ? "es" : ""}
          </Badge>
        </CardTitle>
        <Button onClick={addNewActividad} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">Actividad {index + 1}</h4>
                  {watch(`alternativa.actividades.${index}.tipo`) && (
                    <Badge variant="outline">
                      {watch(`alternativa.actividades.${index}.tipo`)}
                    </Badge>
                  )}
                </div>
                {fields.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="h-8 w-8 p-0 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de actividad</Label>
                  <Controller
                    control={control}
                    name={`alternativa.actividades.${index}.tipo`}
                    render={({ field }) => (
                      <Input
                        placeholder="Ej: Abonos orgánicos, Turismo rural..."
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Cantidad producida</Label>
                    <Controller
                      control={control}
                      name={`alternativa.actividades.${index}.cantidad_producida`}
                      render={({ field }) => (
                        <Input
                          placeholder="Ej: 500 kg"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Unidad de medida</Label>
                    <Controller
                      control={control}
                      name={`alternativa.actividades.${index}.unidad_medida`}
                      render={({ field }) => (
                        <Input
                          placeholder="Ej: kilogramos"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Ingresos anuales
                    </Label>
                    <Controller
                      control={control}
                      name={`alternativa.actividades.${index}.ingresos_anuales`}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Ej: 1200"
                          value={field.value?.toString() || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay actividades alternativas agregadas</p>
            <p className="text-sm mt-2">
              Ej: Turismo rural, artesanías, procesamiento de alimentos, etc.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlternativaSection;
