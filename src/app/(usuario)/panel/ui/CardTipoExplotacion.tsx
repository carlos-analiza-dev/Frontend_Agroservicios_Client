import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  explotacionData: { name: string; value: number; color: string }[];
  EXPLOTACION_COLORS: string[];
}

const CardTipoExplotacion = ({
  EXPLOTACION_COLORS,
  explotacionData,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por Tipo de Explotación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={explotacionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} fincas`, "Cantidad"]} />
              <Legend />
              <Bar dataKey="value" name="Fincas" fill="#8884d8">
                {explotacionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={EXPLOTACION_COLORS[index % EXPLOTACION_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTipoExplotacion;
