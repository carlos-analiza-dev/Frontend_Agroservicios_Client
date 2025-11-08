import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CardDetalles from "./CardDetalles";

interface FincaProduccion {
  id: string;
  nombre_finca: string;
  vacas_ordeño: number;
  vacas_secas: number;
  terneros: number;
  total_bovinos: number;
  tiene_produccion_leche: boolean;
}

interface ProduccionData {
  total_vacas_ordeño: number;
  total_vacas_secas: number;
  total_terneros: number;
  total_bovinos: number;
  fincas_con_produccion_leche: number;
  fincas: FincaProduccion[];
}

interface CardProduccionFincaProps {
  produccionData: ProduccionData | null;
}

const PRODUCCION_COLORS = {
  ordeño: "#0088FE",
  secas: "#00C49F",
  terneros: "#FFBB28",
  total: "#8884D8",
};

const CardProduccionFinca = ({ produccionData }: CardProduccionFincaProps) => {
  if (!produccionData) return null;

  const fincasChartData = produccionData.fincas.map((finca) => ({
    finca: finca.nombre_finca,
    "Vacas Ordeño": finca.vacas_ordeño,
    "Vacas Secas": finca.vacas_secas,
    Terneros: finca.terneros,
    "Total Bovinos": finca.total_bovinos,
  }));

  const totalesData = [
    {
      name: "Vacas Ordeño",
      value: produccionData.total_vacas_ordeño,
      color: PRODUCCION_COLORS.ordeño,
    },
    {
      name: "Vacas Secas",
      value: produccionData.total_vacas_secas,
      color: PRODUCCION_COLORS.secas,
    },
    {
      name: "Terneros",
      value: produccionData.total_terneros,
      color: PRODUCCION_COLORS.terneros,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardDetalles
          titulo="Vacas en Ordeño"
          bgColor="bg-blue-50"
          colorText="text-blue-800"
          colorNumbers="text-blue-600"
          total={produccionData.total_vacas_ordeño}
          porcentaje={
            produccionData.total_bovinos > 0
              ? (produccionData.total_vacas_ordeño /
                  produccionData.total_bovinos) *
                100
              : 0
          }
        />

        <CardDetalles
          titulo="Vacas Secas"
          bgColor="bg-green-50"
          colorText="text-green-800"
          colorNumbers="text-green-600"
          total={produccionData.total_vacas_secas}
          porcentaje={
            produccionData.total_bovinos > 0
              ? (produccionData.total_vacas_secas /
                  produccionData.total_bovinos) *
                100
              : 0
          }
        />

        <CardDetalles
          titulo="Terneros"
          bgColor="bg-amber-50"
          colorText="text-amber-800"
          colorNumbers="text-amber-600"
          total={produccionData.total_terneros}
          porcentaje={
            produccionData.total_bovinos > 0
              ? (produccionData.total_terneros / produccionData.total_bovinos) *
                100
              : 0
          }
        />

        <CardDetalles
          titulo="Total Bovinos"
          bgColor="bg-purple-50"
          colorText="text-purple-800"
          colorNumbers="text-purple-600"
          total={produccionData.total_bovinos}
          porcentaje={produccionData.fincas_con_produccion_leche}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Bovinos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={totalesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} animales`, "Cantidad"]}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Cantidad">
                    {totalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Producción por Finca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fincasChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="finca" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} animales`, "Cantidad"]}
                  />
                  <Legend />
                  <Bar dataKey="Vacas Ordeño" fill={PRODUCCION_COLORS.ordeño} />
                  <Bar dataKey="Vacas Secas" fill={PRODUCCION_COLORS.secas} />
                  <Bar dataKey="Terneros" fill={PRODUCCION_COLORS.terneros} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardProduccionFinca;
