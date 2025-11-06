"use client";
import { calidadHuevosData } from "@/helpers/data/calidadHuevos";
import React, { useState, useEffect } from "react";
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
import {
  Beef,
  Drumstick,
  Feather,
  Leaf,
  Droplet,
  Milk,
  Egg,
} from "lucide-react";

import {
  ProduccionGanadera,
  TipoProduccionGanadera,
  CalidadHuevo,
  UnidadProduccionLeche,
} from "@/api/produccion/interface/crear-produccion-finca.interface";
import { unidadLeche } from "@/helpers/data/dataProduccionFinca";
import { Ganadera } from "@/api/produccion/interface/obter-producciones-userId.interface";
import { tiposProduccion } from "@/helpers/data/dataProduccionFinca copy";

interface Props {
  produccionGanadera: Ganadera | null;
  onDataChange?: (data: Ganadera) => void;
}

const ProduccionGanaderaForm = ({
  produccionGanadera,
  onDataChange,
}: Props) => {
  const initialFormData: Ganadera = {
    id: "",
    tiposProduccion: [],
    produccionLecheCantidad: undefined,
    produccionLecheUnidad: undefined,
    vacasOrdeño: 0,
    vacasSecas: 0,
    terneros: 0,
    fechaPromedioSecado: "",
    cabezasEngordeBovino: null,
    kilosSacrificioBovino: null,
    cerdosEngorde: null,
    pesoPromedioCerdo: null,
    mortalidadLoteAves: null,
    huevosPorDia: null,
    gallinasPonedoras: null,
    calidadHuevo: undefined,
    animalesEngordeCaprino: null,
    pesoPromedioCaprino: null,
    edadSacrificioCaprino: null,
    animalesDisponibles: null,
    pesoPromedioCabeza: null,
    otroProductoNombre: undefined,
    otroProductoUnidadMedida: undefined,
    otroProductoProduccionMensual: null,
  };

  const [formData, setFormData] = useState<Ganadera>(initialFormData);

  useEffect(() => {
    if (produccionGanadera) {
      setFormData(produccionGanadera);
    } else {
      setFormData(initialFormData);
    }
  }, [produccionGanadera]);

  const handleTipoProduccionChange = (
    tipo: TipoProduccionGanadera,
    checked: boolean
  ) => {
    const currentTipos = formData.tiposProduccion || [];
    let nuevosTipos: TipoProduccionGanadera[];

    if (checked) {
      nuevosTipos = [...currentTipos, tipo];
    } else {
      nuevosTipos = currentTipos.filter((t) => t !== tipo);
    }

    const updatedData = {
      ...formData,
      tiposProduccion: nuevosTipos,
    };

    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  const handleFieldChange = (field: keyof Ganadera, value: any) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };

    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  const handleNumberChange = (field: keyof Ganadera, value: string) => {
    const numericValue = value === "" ? null : Number(value);
    const updatedData = {
      ...formData,
      [field]: numericValue,
    };

    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  const itemsHuevos = calidadHuevosData.map((calidad) => ({
    label: calidad.label,
    value: calidad.value.toString(),
  }));

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
                  <div key={tipo} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tipo-${tipo}`}
                      checked={(formData.tiposProduccion || []).includes(tipo)}
                      onCheckedChange={(checked) =>
                        handleTipoProduccionChange(tipo, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`tipo-${tipo}`}
                      className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      {tipo}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            {/* Sección LECHE */}
            {(formData.tiposProduccion || []).includes(
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
                      <Input
                        id="produccionLecheCantidad"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.produccionLecheCantidad || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "produccionLecheCantidad",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="produccionLecheUnidad">
                        Unidad de medida
                      </Label>
                      <Select
                        value={formData.produccionLecheUnidad || ""}
                        onValueChange={(value) =>
                          handleFieldChange("produccionLecheUnidad", value)
                        }
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
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vacasOrdeño">Vacas en ordeño</Label>
                      <Input
                        id="vacasOrdeño"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.vacasOrdeño || ""}
                        onChange={(e) =>
                          handleNumberChange("vacasOrdeño", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vacasSecas">Vacas secas</Label>
                      <Input
                        id="vacasSecas"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.vacasSecas || ""}
                        onChange={(e) =>
                          handleNumberChange("vacasSecas", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="terneros">Terneros</Label>
                      <Input
                        id="terneros"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.terneros || ""}
                        onChange={(e) =>
                          handleNumberChange("terneros", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Fecha promedio de secado</Label>
                    <Input
                      type="date"
                      value={formData.fechaPromedioSecado || ""}
                      onChange={(e) =>
                        handleFieldChange("fechaPromedioSecado", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección CARNE BOVINA */}
            {(formData.tiposProduccion || []).includes(
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
                      <Input
                        id="cabezasEngordeBovino"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.cabezasEngordeBovino || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "cabezasEngordeBovino",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kilosSacrificioBovino">
                        Kilos de sacrificio
                      </Label>
                      <Input
                        id="kilosSacrificioBovino"
                        type="number"
                        placeholder="Kilos"
                        value={formData.kilosSacrificioBovino || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "kilosSacrificioBovino",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección CARNE PORCINA */}
            {(formData.tiposProduccion || []).includes(
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
                      <Input
                        id="cerdosEngorde"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.cerdosEngorde || ""}
                        onChange={(e) =>
                          handleNumberChange("cerdosEngorde", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pesoPromedioCerdo">
                        Peso promedio (Kg)
                      </Label>
                      <Input
                        id="pesoPromedioCerdo"
                        type="number"
                        placeholder="Peso"
                        value={formData.pesoPromedioCerdo || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "pesoPromedioCerdo",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edadSacrificioCaprino">
                        Edad sacrificio (meses)
                      </Label>
                      <Input
                        id="edadSacrificioCaprino"
                        type="number"
                        placeholder="Edad"
                        value={formData.edadSacrificioCaprino || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "edadSacrificioCaprino",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección CARNE AVE */}
            {(formData.tiposProduccion || []).includes(
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
                      Mortalidad del lote (%)
                    </Label>
                    <Input
                      id="mortalidadLoteAves"
                      type="number"
                      placeholder="Porcentaje"
                      value={formData.mortalidadLoteAves || ""}
                      onChange={(e) =>
                        handleNumberChange("mortalidadLoteAves", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección HUEVO */}
            {(formData.tiposProduccion || []).includes(
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
                      <Input
                        id="huevosPorDia"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.huevosPorDia || ""}
                        onChange={(e) =>
                          handleNumberChange("huevosPorDia", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gallinasPonedoras">
                        Gallinas ponedoras
                      </Label>
                      <Input
                        id="gallinasPonedoras"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.gallinasPonedoras || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "gallinasPonedoras",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="calidadHuevo">Calidad del huevo</Label>
                      <Select
                        value={formData.calidadHuevo?.toString() || ""}
                        onValueChange={(value) =>
                          handleFieldChange("calidadHuevo", value)
                        }
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección CARNE CAPRINO */}
            {(formData.tiposProduccion || []).includes(
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
                      <Input
                        id="animalesEngordeCaprino"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.animalesEngordeCaprino || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "animalesEngordeCaprino",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pesoPromedioCaprino">
                        Peso promedio (kg)
                      </Label>
                      <Input
                        id="pesoPromedioCaprino"
                        type="number"
                        placeholder="Peso"
                        value={formData.pesoPromedioCaprino || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "pesoPromedioCaprino",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edadSacrificioCaprino">
                        Edad al sacrificio (meses)
                      </Label>
                      <Input
                        id="edadSacrificioCaprino"
                        type="number"
                        placeholder="Edad"
                        value={formData.edadSacrificioCaprino || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "edadSacrificioCaprino",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección GANADO EN PIE */}
            {(formData.tiposProduccion || []).includes(
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
                      <Input
                        id="animalesDisponibles"
                        type="number"
                        placeholder="Cantidad"
                        value={formData.animalesDisponibles || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "animalesDisponibles",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pesoPromedioCabeza">
                        Peso promedio por cabeza (kg)
                      </Label>
                      <Input
                        id="pesoPromedioCabeza"
                        type="number"
                        placeholder="Peso"
                        value={formData.pesoPromedioCabeza || ""}
                        onChange={(e) =>
                          handleNumberChange(
                            "pesoPromedioCabeza",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección OTRO */}
            {(formData.tiposProduccion || []).includes(
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
                      <Input
                        id="otroProductoNombre"
                        placeholder="Nombre del producto"
                        value={formData.otroProductoNombre || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "otroProductoNombre",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otroProductoUnidadMedida">
                        Unidad de medida
                      </Label>
                      <Input
                        id="otroProductoUnidadMedida"
                        placeholder="Unidad de medida"
                        value={formData.otroProductoUnidadMedida || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "otroProductoUnidadMedida",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otroProductoProduccionMensual">
                      Producción mensual
                    </Label>
                    <Input
                      id="otroProductoProduccionMensual"
                      type="number"
                      placeholder="Producción mensual"
                      value={formData.otroProductoProduccionMensual || ""}
                      onChange={(e) =>
                        handleNumberChange(
                          "otroProductoProduccionMensual",
                          e.target.value
                        )
                      }
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

export default ProduccionGanaderaForm;
