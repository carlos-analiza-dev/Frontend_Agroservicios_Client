"use client";
import useGetTotalAnimales from "@/hooks/dashboard/useGetTotalAnimales";
import useGetTotalAnimalesSexo from "@/hooks/dashboard/useGetTotalAnimalesSexo";
import React from "react";
import useGetTotalAnimalesMuerte from "@/hooks/dashboard/useGetTotalAnimalesMuerte";
import CardPastelEstados from "./ui/CardPastelEstados";
import useGetTotalAnimalesCompradosNacidos from "@/hooks/dashboard/useGetTotalAnimalesCompradosNacidos";
import useGetTotalFincas from "@/hooks/dashboard/useGetTotalFincas";
import CardTotales from "./ui/CardTotales";
import useGetTotalCitasCompletadas from "@/hooks/dashboard/useGetTotalCitasCompletadas";
import useGetFincasTipoExplotacion from "@/hooks/dashboard/useGetFincasTipoExplotacion";
import useGetEspeciesByFincas from "@/hooks/dashboard/useGetEspeciesByFincas";
import {
  Especie,
  ResponseEspeciesByFinca,
} from "@/api/dashboard/interfaces/response-especies-fincas.interface";
import CardEspeciesByFinca from "./ui/CardEspeciesByFinca";
import CardTipoExplotacion from "./ui/CardTipoExplotacion";
import CardOrigenAnimal from "./ui/CardOrigenAnimal";
import CardSexo from "./ui/CardSexo";
import {
  COLORS,
  ESPECIES_COLORS,
  EXPLOTACION_COLORS,
  MORTALIDAD_COLORS,
  ORIGEN_COLORS,
} from "@/helpers/data/colorDashboard";
import CardDetalles from "./ui/CardDetalles";
import CardTasaReproduccion from "./ui/CardTasaReproduccion";
import useGetProduccionGanaderaFinca from "@/hooks/dashboard/useGetProduccionGanaderaFinca";
import CardProduccionFinca from "./ui/CardProduccionFinca";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PanelPageGanadero = () => {
  const { data: total_animales } = useGetTotalAnimales();
  const { data: animales_sexo } = useGetTotalAnimalesSexo();
  const { data: animales_muerte } = useGetTotalAnimalesMuerte();
  const { data: comprados_nacidos } = useGetTotalAnimalesCompradosNacidos();
  const { data: total_fincas } = useGetTotalFincas();
  const { data: citas_completadas } = useGetTotalCitasCompletadas();
  const { data: tipo_explotacion } = useGetFincasTipoExplotacion();
  const { data: especies_fincas } = useGetEspeciesByFincas();
  const { data: produccion_finca } = useGetProduccionGanaderaFinca();

  const especiesUnicas = Array.from(
    new Set(
      especies_fincas?.flatMap((finca: ResponseEspeciesByFinca) =>
        finca.especies.map((e: Especie) => e.especie)
      ) || []
    )
  );

  const barChartData =
    especies_fincas?.map((finca: ResponseEspeciesByFinca) => ({
      finca: finca.nombre_finca,
      ...finca.especies.reduce(
        (acc: { [key: string]: number }, especie: Especie) => {
          acc[especie.especie] = especie.cantidad;
          return acc;
        },
        {}
      ),
      total: finca.cantidad_total_especies,
    })) || [];

  const sexoData =
    animales_sexo?.map((item, index) => ({
      name: item.sexo,
      value: parseInt(item.total),
      color: COLORS[index % COLORS.length],
    })) || [];

  const mortalidadData = animales_muerte
    ? [
        {
          name: "Vivos",
          value: parseInt(animales_muerte.vivos),
          color: MORTALIDAD_COLORS[0],
        },
        {
          name: "Muertos",
          value: parseInt(animales_muerte.muertos),
          color: MORTALIDAD_COLORS[1],
        },
      ]
    : [];

  const origenData = comprados_nacidos
    ? [
        {
          name: "Nacidos",
          value: parseInt(comprados_nacidos.nacidos),
          color: ORIGEN_COLORS[1],
        },
        {
          name: "Comprados",
          value: parseInt(comprados_nacidos.comprados),
          color: ORIGEN_COLORS[0],
        },
      ]
    : [];

  const explotacionData =
    tipo_explotacion?.map((item, index) => ({
      name: item.tipo,
      value: parseInt(item.total),
      color: EXPLOTACION_COLORS[index % EXPLOTACION_COLORS.length],
    })) || [];

  const totalVivos = parseInt(animales_muerte?.vivos || "0");
  const totalMuertos = parseInt(animales_muerte?.muertos || "0");
  const totalGeneral = totalVivos + totalMuertos;
  const porcentajeVivos =
    totalGeneral > 0 ? (totalVivos / totalGeneral) * 100 : 0;
  const porcentajeMuertos =
    totalGeneral > 0 ? (totalMuertos / totalGeneral) * 100 : 0;

  const totalNacidos = parseInt(comprados_nacidos?.nacidos || "0");
  const totalComprados = parseInt(comprados_nacidos?.comprados || "0");
  const totalOrigen = totalNacidos + totalComprados;
  const porcentajeNacidos =
    totalOrigen > 0 ? (totalNacidos / totalOrigen) * 100 : 0;
  const porcentajeComprados =
    totalOrigen > 0 ? (totalComprados / totalOrigen) * 100 : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Panel Ganadero</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <CardTotales
          titulo="Total de Animales Registrados"
          total={total_animales || 0}
          sub_titulo="Animales en total"
        />

        <CardTotales
          titulo="Total de Fincas"
          total={total_fincas || 0}
          sub_titulo="Fincas en total"
        />

        <CardTotales
          titulo="Total de Citas Completadas"
          total={citas_completadas || 0}
          sub_titulo="Citas en total"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Producción Ganadera - Bovinos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardProduccionFinca produccionData={produccion_finca || null} />
        </CardContent>
      </Card>

      <CardEspeciesByFinca
        barChartData={barChartData}
        especiesUnicas={especiesUnicas}
        ESPECIES_COLORS={ESPECIES_COLORS}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardTipoExplotacion
          explotacionData={explotacionData}
          EXPLOTACION_COLORS={EXPLOTACION_COLORS}
        />

        <CardPastelEstados
          mortalidadData={mortalidadData}
          MORTALIDAD_COLORS={MORTALIDAD_COLORS}
          totalVivos={totalVivos}
          porcentajeVivos={porcentajeVivos}
          totalMuertos={totalMuertos}
          porcentajeMuertos={porcentajeMuertos}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardOrigenAnimal
          origenData={origenData}
          ORIGEN_COLORS={ORIGEN_COLORS}
          totalComprados={totalComprados}
          porcentajeComprados={porcentajeComprados}
          totalNacidos={totalNacidos}
          porcentajeNacidos={porcentajeNacidos}
        />

        <CardSexo sexoData={sexoData} COLORS={COLORS} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardDetalles
          titulo="Animales Vivos"
          total={totalVivos}
          porcentaje={porcentajeVivos}
          colorText="text-green-800"
          colorNumbers="text-green-600"
          bgColor="bg-green-50"
        />

        <CardDetalles
          titulo="Animales Muertos"
          total={totalMuertos}
          porcentaje={porcentajeMuertos}
          colorText="text-red-800"
          colorNumbers="text-red-600"
          bgColor="bg-red-50"
        />

        <CardDetalles
          titulo="Comprados"
          total={totalComprados}
          porcentaje={porcentajeComprados}
          colorText="text-purple-800"
          colorNumbers="text-purple-600"
          bgColor="bg-purple-50"
        />

        <CardDetalles
          titulo="Nacidos"
          total={totalNacidos}
          porcentaje={porcentajeNacidos}
          colorText="text-amber-800"
          colorNumbers="text-amber-600"
          bgColor="bg-amber-50"
        />
      </div>

      <CardTasaReproduccion
        porcentajeNacidos={porcentajeNacidos}
        totalNacidos={totalNacidos}
        totalOrigen={totalOrigen}
      />
    </div>
  );
};

export default PanelPageGanadero;
