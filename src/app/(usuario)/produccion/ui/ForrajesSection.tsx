"use client";
import {
  meses,
  tiposHeno,
  tiposInsumo,
} from "@/helpers/data/dataProduccionFinca";
import React from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
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
import { Plus, Trash2, BarrelIcon } from "lucide-react";
import {
  CreateProduccionFinca,
  InsumoTipo,
} from "@/api/produccion/interface/crear-produccion-finca.interface";
import { Finca } from "@/api/fincas/interfaces/response-fincasByPropietario.interface";

interface InsumoItem {
  id: string;
  tipo: InsumoTipo;
  tipo_heno?: string;
  estacionalidad_heno?: string;
  meses_produccion_heno?: string[];
  produccion_manzana?: string;
  tiempo_estimado_cultivo?: string;
}

interface ForrajesSectionProps {
  control: Control<CreateProduccionFinca>;
  fields: InsumoItem[];
  append: (obj: { tipo: InsumoTipo }) => void;
  remove: (index: number) => void;
  watch: UseFormWatch<CreateProduccionFinca>;
  fincaSeleccionada: Finca | null;
}

const ForrajesSection: React.FC<ForrajesSectionProps> = ({
  control,
  fields,
  append,
  remove,
  watch,
  fincaSeleccionada,
}) => {
  const addNewInsumo = () => {
    append({
      tipo: "Heno" as InsumoTipo,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BarrelIcon className="h-5 w-5" />
          Forrajes e Insumos
          <Badge variant="secondary" className="ml-2">
            {fields.length} insumo{fields.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
        <Button onClick={addNewInsumo} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {fields.map((field, index) => {
          const currentTipo = watch(`forrajesInsumo.insumos.${index}.tipo`);
          const isHeno = currentTipo === "Heno";

          return (
            <Card key={field.id} className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Insumo {index + 1}</h4>
                    <Badge variant="outline">{currentTipo}</Badge>
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
                  {/* Tipo de insumo */}
                  <div className="space-y-2">
                    <Label>Tipo de insumo</Label>
                    <Controller
                      control={control}
                      name={`forrajesInsumo.insumos.${index}.tipo`}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposInsumo.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Campos específicos según el tipo */}
                  {isHeno ? (
                    <>
                      <div className="space-y-2">
                        <Label>Tipo de heno</Label>
                        <Controller
                          control={control}
                          name={`forrajesInsumo.insumos.${index}.tipo_heno`}
                          render={({ field }) => (
                            <Select
                              value={field.value || ""}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo de heno" />
                              </SelectTrigger>
                              <SelectContent>
                                {tiposHeno.map((tipo) => (
                                  <SelectItem key={tipo} value={tipo}>
                                    {tipo}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Estacionalidad</Label>
                        <Controller
                          control={control}
                          name={`forrajesInsumo.insumos.${index}.estacionalidad_heno`}
                          render={({ field }) => (
                            <Input
                              placeholder="Estacionalidad de cosecha"
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Meses de producción</Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {meses.map((mes) => (
                            <Controller
                              key={mes}
                              control={control}
                              name={`forrajesInsumo.insumos.${index}.meses_produccion_heno`}
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
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>
                          Producción por{" "}
                          {fincaSeleccionada?.medida_finca || "hectárea"}
                        </Label>
                        <Controller
                          control={control}
                          name={`forrajesInsumo.insumos.${index}.produccion_manzana`}
                          render={({ field }) => (
                            <Input
                              type="number"
                              placeholder="Ej: 15 toneladas"
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tiempo estimado</Label>
                        <Controller
                          control={control}
                          name={`forrajesInsumo.insumos.${index}.tiempo_estimado_cultivo`}
                          render={({ field }) => (
                            <Input
                              placeholder="Ej: 3 meses"
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BarrelIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay insumos agregados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ForrajesSection;
