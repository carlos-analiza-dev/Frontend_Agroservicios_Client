"use client";
import { meses, tiposCultivo } from "@/helpers/data/dataProduccionFinca";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Sprout } from "lucide-react";
import {
  CreateProduccionFinca,
  CultivoTipo,
} from "@/api/produccion/interface/crear-produccion-finca.interface";
import { Finca } from "@/api/fincas/interfaces/response-fincasByPropietario.interface";

interface AgricolaSectionProps {
  control: Control<CreateProduccionFinca>;
  fields: FieldArrayWithId<CreateProduccionFinca, "agricola.cultivos", "id">[];
  append: (obj: {
    tipo: CultivoTipo;
    estacionalidad: string;
    tiempo_estimado_cultivo: string;
    meses_produccion: string[];
    cantidad_producida_hectareas: string;
  }) => void;
  remove: (index: number) => void;
  watch: UseFormWatch<CreateProduccionFinca>;
  fincaSeleccionada: Finca;
}

const AgricolaSection: React.FC<AgricolaSectionProps> = ({
  control,
  fields,
  append,
  remove,
  watch,
  fincaSeleccionada,
}) => {
  const addNewCultivo = () => {
    append({
      tipo: "" as CultivoTipo,
      estacionalidad: "",
      tiempo_estimado_cultivo: "",
      meses_produccion: [],
      cantidad_producida_hectareas: "",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Sprout className="h-5 w-5" />
          Producción Agrícola
          <Badge variant="secondary" className="ml-2">
            {fields.length} cultivo{fields.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
        <Button onClick={addNewCultivo} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Cultivo {index + 1}</h4>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tipo de cultivo */}
                <div className="space-y-2">
                  <Label>Tipo de cultivo</Label>
                  <Controller
                    control={control}
                    name={`agricola.cultivos.${index}.tipo`}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposCultivo.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Estacionalidad */}
                <div className="space-y-2">
                  <Label>Estacionalidad</Label>
                  <Controller
                    control={control}
                    name={`agricola.cultivos.${index}.estacionalidad`}
                    render={({ field }) => (
                      <Input
                        placeholder="Estacionalidad"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Duración */}
                <div className="space-y-2">
                  <Label>Duración del cultivo</Label>
                  <Controller
                    control={control}
                    name={`agricola.cultivos.${index}.tiempo_estimado_cultivo`}
                    render={({ field }) => (
                      <Input
                        placeholder="Ej: 6 meses"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Producción */}
                <div className="space-y-2">
                  <Label>Producción por {fincaSeleccionada.medida_finca}</Label>
                  <Controller
                    control={control}
                    name={`agricola.cultivos.${index}.cantidad_producida_hectareas`}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="Ej: 3000 kg"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Meses de producción */}
              <div className="mt-4 space-y-2">
                <Label>Meses de producción</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {meses.map((mes) => (
                    <Controller
                      key={mes}
                      control={control}
                      name={`agricola.cultivos.${index}.meses_produccion`}
                      render={({ field: { value = [], onChange } }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`mes-${index}-${mes}`}
                            checked={value.includes(mes)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...value, mes]
                                : value.filter((item) => item !== mes);
                              onChange(newValue);
                            }}
                          />
                          <Label
                            htmlFor={`mes-${index}-${mes}`}
                            className="text-sm cursor-pointer"
                          >
                            {mes}
                          </Label>
                        </div>
                      )}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Sprout className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay cultivos agregados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgricolaSection;
