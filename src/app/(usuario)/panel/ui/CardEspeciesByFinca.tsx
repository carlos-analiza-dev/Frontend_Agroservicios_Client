import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  barChartData: { total: number; finca: string }[];
  especiesUnicas: string[];
  ESPECIES_COLORS: string[];
}

const CardEspeciesByFinca = ({
  barChartData,
  especiesUnicas,
  ESPECIES_COLORS,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Especies por Finca</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="finca"
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {especiesUnicas.map((especie, index) => (
                <Bar
                  key={especie}
                  dataKey={especie}
                  name={especie}
                  fill={ESPECIES_COLORS[index % ESPECIES_COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardEspeciesByFinca;
