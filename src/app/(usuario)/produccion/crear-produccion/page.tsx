"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2, Save, Tractor } from "lucide-react";
import { useAuthStore } from "@/providers/store/useAuthStore";
import { Finca } from "@/api/fincas/interfaces/response-fincasByPropietario.interface";
import { useFincasPropietarios } from "@/hooks/fincas/useFincasPropietarios";
import { CreateProduccionFinca } from "@/api/produccion/interface/crear-produccion-finca.interface";
import { CrearProduccionFinca } from "@/api/produccion/accions/crear-produccion-finca";
import { toast } from "react-toastify";
import GanaderaSection from "../ui/GanaderaSection";
import AgricolaSection from "../ui/AgricolaSection";
import ForrajesSection from "../ui/ForrajesSection";
import AlternativaSection from "../ui/AlternativaSection";
import ApiculturaSection from "../ui/ApiculturaSection";

type ProductionSection =
  | "ganadera"
  | "alternativa"
  | "forrajes"
  | "agricola"
  | "apicultura";

const CrearProduccionPage = () => {
  const { cliente } = useAuthStore();
  const userId = cliente?.id || "";
  const queryClient = useQueryClient();
  const router = useRouter();
  const [section, setSection] = useState<ProductionSection>("ganadera");
  const [fincaSeleccionada, setFincaSeleccionada] = useState<Finca | null>(
    null
  );
  const { data: fincas } = useFincasPropietarios(userId);

  const { control, handleSubmit, watch, setValue, reset } =
    useForm<CreateProduccionFinca>();

  const {
    fields: cultivosFields,
    append: appendCultivo,
    remove: removeCultivo,
  } = useFieldArray({
    control,
    name: "agricola.cultivos",
  });

  const {
    fields: insumosFields,
    append: appendInsumo,
    remove: removeInsumo,
  } = useFieldArray({
    control,
    name: "forrajesInsumo.insumos",
  });

  const {
    fields: actividadesFields,
    append: appendActividad,
    remove: removeActividad,
  } = useFieldArray({
    control,
    name: "alternativa.actividades",
  });

  const fincasItems =
    fincas?.data.fincas.map((finca) => ({
      label: finca.nombre_finca,
      value: finca.id,
    })) || [];

  const sectionConfig = {
    ganadera: { label: "Ganadería", icon: "🐄" },
    forrajes: { label: "Forrajes", icon: "🌾" },
    agricola: { label: "Agrícola", icon: "🌱" },
    apicultura: { label: "Apicultura", icon: "🐝" },
    alternativa: { label: "Alternativa", icon: "🔄" },
  };

  const mutate_produccion = useMutation({
    mutationFn: (data: CreateProduccionFinca) => CrearProduccionFinca(data),
    onSuccess: () => {
      toast.success("Producción creada con éxito");
      queryClient.invalidateQueries({ queryKey: ["producciones-user"] });
      reset();
      router.back();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const messages = error.response?.data?.message;
        const errorMessage = Array.isArray(messages)
          ? messages[0]
          : typeof messages === "string"
            ? messages
            : "Hubo un error al ingresar la producción";

        toast.error(errorMessage);
      } else {
        toast.error("Contacte al administrador");
      }
    },
  });

  const onSubmit = (data: CreateProduccionFinca) => {
    mutate_produccion.mutate({ ...data, userId: userId });
  };

  const renderSection = () => {
    if (!fincaSeleccionada) {
      return (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Tractor className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">
                Selecciona una finca para habilitar las secciones de producción
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    switch (section) {
      case "ganadera":
        return <GanaderaSection control={control} watch={watch} />;
      case "agricola":
        return (
          <AgricolaSection
            control={control}
            fields={cultivosFields}
            append={appendCultivo}
            remove={removeCultivo}
            watch={watch}
            fincaSeleccionada={fincaSeleccionada}
          />
        );
      case "forrajes":
        return (
          <ForrajesSection
            control={control}
            fields={insumosFields}
            append={appendInsumo}
            remove={removeInsumo}
            watch={watch}
            fincaSeleccionada={fincaSeleccionada}
          />
        );
      case "alternativa":
        return (
          <AlternativaSection
            control={control}
            fields={actividadesFields}
            append={appendActividad}
            remove={removeActividad}
            watch={watch}
          />
        );
      case "apicultura":
        return <ApiculturaSection control={control} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/produccion")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Tractor className="h-6 w-6" />
              Crear Nueva Producción
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="finca">Seleccionar Finca</Label>
              <Controller
                control={control}
                name="fincaId"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const finca = fincas?.data.fincas.find(
                        (f) => f.id === value
                      );
                      setFincaSeleccionada(finca || null);
                    }}
                  >
                    <SelectTrigger id="finca">
                      <SelectValue placeholder="Selecciona una finca" />
                    </SelectTrigger>
                    <SelectContent>
                      {fincasItems.map((finca) => (
                        <SelectItem key={finca.value} value={finca.value}>
                          {finca.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "produccion_mixta", label: "Producción mixta" },
                {
                  name: "transformacion_artesanal",
                  label: "Transformación artesanal",
                },
                { name: "consumo_propio", label: "Consumo propio" },
                { name: "produccion_venta", label: "Producción para venta" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between space-x-2"
                >
                  <Label htmlFor={item.name} className="flex-1 cursor-pointer">
                    {item.label}
                  </Label>
                  <Controller
                    control={control}
                    name={item.name as any}
                    render={({ field }) => (
                      <Switch
                        id={item.name}
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Sección de Producción</Label>
              <Tabs
                value={section}
                onValueChange={(value) =>
                  setSection(value as ProductionSection)
                }
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(sectionConfig).map(([key, config]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      disabled={!fincaSeleccionada}
                      className="flex items-center gap-2"
                    >
                      <span>{config.icon}</span>
                      <span className="hidden sm:inline">{config.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {renderSection()}
              </ScrollArea>
            </div>

            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={mutate_produccion.isPending || !fincaSeleccionada}
              className="w-full md:w-auto md:ml-auto"
              size="lg"
            >
              {mutate_produccion.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Guardar Producción
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrearProduccionPage;
