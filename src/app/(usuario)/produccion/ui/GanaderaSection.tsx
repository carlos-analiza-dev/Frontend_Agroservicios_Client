"use client";
import { calidadHuevosData } from "@/helpers/data/calidadHuevos";
import React from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Beef,
  Drumstick,
  Feather,
  Leaf,
  CupSoda,
  Droplet,
  TreePine,
  Milk,
  Egg,
} from "lucide-react";

import {
  CreateProduccionFinca,
  TipoProduccionGanadera,
} from "@/api/produccion/interface/crear-produccion-finca.interface";
import { tiposProduccion } from "@/helpers/data/dataProduccionFinca copy";
import { unidadLeche } from "@/helpers/data/dataProduccionFinca";

interface Props {
  control: Control<CreateProduccionFinca>;
  watch: UseFormWatch<CreateProduccionFinca>;
}

const GanaderaSection: React.FC<Props> = ({ control, watch }) => {
  const itemsHuevos =
    calidadHuevosData.map((calidad) => ({
      label: calidad.label,
      value: calidad.value.toString(),
    })) || [];

  const sectionIcons = {
    [TipoProduccionGanadera.LECHE]: Milk,
    [TipoProduccionGanadera.CARNE_BOVINA]: Beef,
    [TipoProduccionGanadera.CARNE_PORCINA]: Drumstick,
    [TipoProduccionGanadera.CARNE_AVE]: Feather,
    [TipoProduccionGanadera.HUEVO]: Egg,
    [TipoProduccionGanadera.CARNE_CAPRINO]: Droplet,
    [TipoProduccionGanadera.GANADO_PIE]: Beef,
    [TipoProduccionGanadera.OTRO]: Beef,
  };

  const sectionTitles = {
    [TipoProduccionGanadera.LECHE]: "Producción de Leche",
    [TipoProduccionGanadera.CARNE_BOVINA]: "Producción de Carne Bovina",
    [TipoProduccionGanadera.CARNE_PORCINA]: "Producción de Carne Porcina",
    [TipoProduccionGanadera.CARNE_AVE]: "Producción Carne de Ave",
    [TipoProduccionGanadera.HUEVO]: "Producción de Huevo",
    [TipoProduccionGanadera.CARNE_CAPRINO]: "Producción de Carne Caprino",
    [TipoProduccionGanadera.GANADO_PIE]: "Ganado en Pie",
    [TipoProduccionGanadera.OTRO]: "Otro tipo de producción",
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Beef className="h-5 w-5" />
            Producción Ganadera
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Tipos de Producción:
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tiposProduccion.map((tipo) => {
                const IconComponent =
                  sectionIcons[tipo as TipoProduccionGanadera];
                return (
                  <Controller
                    key={tipo}
                    control={control}
                    name="ganadera.tiposProduccion"
                    render={({ field: { value = [], onChange } }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`tipo-${tipo}`}
                          checked={value.includes(tipo)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...value, tipo]
                              : value.filter((item) => item !== tipo);
                            onChange(newValue);
                          }}
                        />
                        <Label
                          htmlFor={`tipo-${tipo}`}
                          className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                        >
                          {IconComponent && (
                            <IconComponent className="h-4 w-4" />
                          )}
                          {tipo}
                        </Label>
                      </div>
                    )}
                  />
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.LECHE
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Milk className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.LECHE]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="produccionLecheCantidad">
                        Cantidad de producción
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.produccionLecheCantidad"
                        render={({ field }) => (
                          <Input
                            id="produccionLecheCantidad"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="produccionLecheUnidad">
                        Unidad de medida
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.produccionLecheUnidad"
                        render={({ field }) => (
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar unidad" />
                            </SelectTrigger>
                            <SelectContent>
                              {unidadLeche.map((unidad) => (
                                <SelectItem key={unidad} value={unidad}>
                                  {unidad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vacasOrdeño">Vacas en ordeño</Label>
                      <Controller
                        control={control}
                        name="ganadera.vacasOrdeño"
                        render={({ field }) => (
                          <Input
                            id="vacasOrdeño"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vacasSecas">Vacas secas</Label>
                      <Controller
                        control={control}
                        name="ganadera.vacasSecas"
                        render={({ field }) => (
                          <Input
                            id="vacasSecas"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="terneros">Terneros</Label>
                      <Controller
                        control={control}
                        name="ganadera.terneros"
                        render={({ field }) => (
                          <Input
                            id="terneros"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Fecha promedio de secado</Label>
                    <Controller
                      control={control}
                      name="ganadera.fechaPromedioSecado"
                      render={({ field }) => (
                        <Input
                          type="date"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.CARNE_BOVINA
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Beef className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.CARNE_BOVINA]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cabezasEngordeBovino">
                        Cabezas en engorde
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.cabezasEngordeBovino"
                        render={({ field }) => (
                          <Input
                            id="cabezasEngordeBovino"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kilosSacrificioBovino">
                        Kilos de sacrificio
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.kilosSacrificioBovino"
                        render={({ field }) => (
                          <Input
                            id="kilosSacrificioBovino"
                            type="number"
                            placeholder="Kilos"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.CARNE_PORCINA
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Drumstick className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.CARNE_PORCINA]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cerdosEngorde">Cabezas en engorde</Label>
                      <Controller
                        control={control}
                        name="ganadera.cerdosEngorde"
                        render={({ field }) => (
                          <Input
                            id="cerdosEngorde"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pesoPromedioCerdo">
                        Peso promedio (Kg)
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.pesoPromedioCerdo"
                        render={({ field }) => (
                          <Input
                            id="pesoPromedioCerdo"
                            type="number"
                            placeholder="Peso"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edadSacrificioProcino">
                        Edad sacrificio
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.edadSacrificioProcino"
                        render={({ field }) => (
                          <Input
                            id="edadSacrificioProcino"
                            type="number"
                            placeholder="Edad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.CARNE_AVE
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Feather className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.CARNE_AVE]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mortalidadLoteAves">
                      Mortalidad del lote
                    </Label>
                    <Controller
                      control={control}
                      name="ganadera.mortalidadLoteAves"
                      render={({ field }) => (
                        <Input
                          id="mortalidadLoteAves"
                          type="number"
                          placeholder="Porcentaje"
                          value={field.value?.toString() || ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.HUEVO
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Egg className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.HUEVO]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="huevosPorDia">Huevos por día</Label>
                      <Controller
                        control={control}
                        name="ganadera.huevosPorDia"
                        render={({ field }) => (
                          <Input
                            id="huevosPorDia"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gallinasPonedoras">
                        Gallinas ponedoras
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.gallinasPonedoras"
                        render={({ field }) => (
                          <Input
                            id="gallinasPonedoras"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="calidadHuevo">Calidad del huevo</Label>
                      <Controller
                        control={control}
                        name="ganadera.calidadHuevo"
                        render={({ field }) => (
                          <Select
                            value={field.value?.toString() || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar calidad" />
                            </SelectTrigger>
                            <SelectContent>
                              {itemsHuevos.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.CARNE_CAPRINO
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Leaf className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.CARNE_CAPRINO]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="animalesEngordeCaprino">
                        Animales en engorde
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.animalesEngordeCaprino"
                        render={({ field }) => (
                          <Input
                            id="animalesEngordeCaprino"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pesoPromedioCaprino">
                        Peso promedio (kg)
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.pesoPromedioCaprino"
                        render={({ field }) => (
                          <Input
                            id="pesoPromedioCaprino"
                            type="number"
                            placeholder="Peso"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edadSacrificioCaprino">
                        Edad al sacrificio
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.edadSacrificioCaprino"
                        render={({ field }) => (
                          <Input
                            id="edadSacrificioCaprino"
                            type="number"
                            placeholder="Edad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.GANADO_PIE
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Beef className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.GANADO_PIE]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="animalesDisponibles">
                        Animales disponibles
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.animalesDisponibles"
                        render={({ field }) => (
                          <Input
                            id="animalesDisponibles"
                            type="number"
                            placeholder="Cantidad"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pesoPromedioCabeza">
                        Peso promedio por cabeza (kg)
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.pesoPromedioCabeza"
                        render={({ field }) => (
                          <Input
                            id="pesoPromedioCabeza"
                            type="number"
                            placeholder="Peso"
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {watch("ganadera.tiposProduccion")?.includes(
              TipoProduccionGanadera.OTRO
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Beef className="h-4 w-4" />
                    {sectionTitles[TipoProduccionGanadera.OTRO]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="otroProductoNombre">
                        Nombre del producto
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.otroProductoNombre"
                        render={({ field }) => (
                          <Input
                            id="otroProductoNombre"
                            placeholder="Nombre del producto"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otroProductoUnidadMedida">
                        Unidad de medida
                      </Label>
                      <Controller
                        control={control}
                        name="ganadera.otroProductoUnidadMedida"
                        render={({ field }) => (
                          <Input
                            id="otroProductoUnidadMedida"
                            placeholder="Unidad de medida"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otroProductoProduccionMensual">
                      Producción mensual
                    </Label>
                    <Controller
                      control={control}
                      name="ganadera.otroProductoProduccionMensual"
                      render={({ field }) => (
                        <Input
                          id="otroProductoProduccionMensual"
                          type="number"
                          placeholder="Producción mensual"
                          value={field.value?.toString() || ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GanaderaSection;
