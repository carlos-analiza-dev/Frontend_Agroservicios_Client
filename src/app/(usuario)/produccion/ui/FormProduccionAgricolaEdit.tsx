"use client";
import {
  Agricola,
  Cultivo,
} from "@/api/produccion/interface/obter-producciones-userId.interface";
import {
  Cultivo as CultivoCreate,
  CultivoTipo,
} from "@/api/produccion/interface/crear-produccion-finca.interface";
import React, { useState, useEffect } from "react";
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
import { meses, tiposCultivo } from "@/helpers/data/dataProduccionFinca";

interface Props {
  produccionAgricola: Agricola | null;
  onDataChange?: (data: Agricola) => void;
}

const FormProduccionAgricolaEdit = ({
  produccionAgricola,
  onDataChange,
}: Props) => {
  const [cultivos, setCultivos] = useState<CultivoCreate[]>([]);

  useEffect(() => {
    if (produccionAgricola?.cultivos) {
      const cultivosMapeados: CultivoCreate[] = produccionAgricola.cultivos.map(
        (cultivo) => ({
          tipo: cultivo.tipo as any,
          descripcion: cultivo.descripcion || "",
          estacionalidad: cultivo.estacionalidad || "",
          tiempo_estimado_cultivo: cultivo.tiempo_estimado_cultivo,
          meses_produccion: cultivo.meses_produccion || [],
          cantidad_producida_hectareas: cultivo.cantidad_producida_hectareas,
        })
      );
      setCultivos(cultivosMapeados);
    }
  }, [produccionAgricola]);

  const handleCultivoChange = (
    index: number,
    field: keyof CultivoCreate,
    value: any
  ) => {
    const updatedCultivos = [...cultivos];
    updatedCultivos[index] = {
      ...updatedCultivos[index],
      [field]: value,
    };
    setCultivos(updatedCultivos);
    notifyDataChange(updatedCultivos);
  };

  const handleMesesChange = (index: number, mes: string, checked: boolean) => {
    const updatedCultivos = [...cultivos];
    const currentMeses = updatedCultivos[index].meses_produccion || [];

    if (checked) {
      updatedCultivos[index].meses_produccion = [...currentMeses, mes];
    } else {
      updatedCultivos[index].meses_produccion = currentMeses.filter(
        (m) => m !== mes
      );
    }

    setCultivos(updatedCultivos);
    notifyDataChange(updatedCultivos);
  };

  const addNewCultivo = () => {
    const newCultivo: CultivoCreate = {
      tipo: "" as CultivoTipo,
      descripcion: "",
      estacionalidad: "",
      tiempo_estimado_cultivo: "",
      meses_produccion: [],
      cantidad_producida_hectareas: "",
    };

    const updatedCultivos = [...cultivos, newCultivo];
    setCultivos(updatedCultivos);
    notifyDataChange(updatedCultivos);
  };

  const removeCultivo = (index: number) => {
    const updatedCultivos = cultivos.filter((_, i) => i !== index);
    setCultivos(updatedCultivos);
    notifyDataChange(updatedCultivos);
  };

  const notifyDataChange = (updatedCultivos: CultivoCreate[]) => {
    if (onDataChange && produccionAgricola) {
      onDataChange({
        ...produccionAgricola,
        cultivos: updatedCultivos,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Sprout className="h-5 w-5" />
          Producción Agrícola
          <Badge variant="secondary" className="ml-2">
            {cultivos.length} cultivo{cultivos.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
        <Button onClick={addNewCultivo} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {cultivos.map((cultivo, index) => (
          <Card key={index} className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Cultivo {index + 1}</h4>
                {cultivos.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCultivo(index)}
                    className="h-8 w-8 p-0 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de cultivo *</Label>
                  <Select
                    value={cultivo.tipo}
                    onValueChange={(value) =>
                      handleCultivoChange(index, "tipo", value)
                    }
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
                </div>

                <div className="space-y-2">
                  <Label>Descripción / Método de cultivo</Label>
                  <Input
                    placeholder="Ej: Tradicional, Orgánico, etc."
                    value={cultivo.descripcion || ""}
                    onChange={(e) =>
                      handleCultivoChange(index, "descripcion", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Estacionalidad *</Label>
                  <Input
                    placeholder="Ej: Anual, Temporal, etc."
                    value={cultivo.estacionalidad || ""}
                    onChange={(e) =>
                      handleCultivoChange(
                        index,
                        "estacionalidad",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duración del cultivo *</Label>
                  <Input
                    placeholder="Ej: 6 meses"
                    value={cultivo.tiempo_estimado_cultivo || ""}
                    onChange={(e) =>
                      handleCultivoChange(
                        index,
                        "tiempo_estimado_cultivo",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Producción por hectárea *</Label>
                  <Input
                    placeholder="Ej: 3000 kg"
                    value={cultivo.cantidad_producida_hectareas || ""}
                    onChange={(e) =>
                      handleCultivoChange(
                        index,
                        "cantidad_producida_hectareas",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label>Meses de producción *</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {meses.map((mes) => (
                    <div key={mes} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mes-${index}-${mes}`}
                        checked={
                          cultivo.meses_produccion?.includes(mes) || false
                        }
                        onCheckedChange={(checked) =>
                          handleMesesChange(index, mes, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`mes-${index}-${mes}`}
                        className="text-sm cursor-pointer"
                      >
                        {mes}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {cultivos.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Sprout className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay cultivos agregados</p>
            <Button onClick={addNewCultivo} className="mt-2">
              <Plus className="h-4 w-4 mr-1" />
              Agregar primer cultivo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormProduccionAgricolaEdit;
