import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  titulo: string;
  colorText: string;
  colorNumbers: string;
  bgColor: string;
  total: number;
  porcentaje: number;
}

const CardDetalles = ({
  titulo,
  colorText,
  colorNumbers,
  bgColor,
  total,
  porcentaje,
}: Props) => {
  return (
    <Card className={`${bgColor} border border-gray-200`}>
      <CardHeader className="pb-2">
        <CardTitle
          className={`text-sm font-medium ${colorText} flex items-center`}
        >
          <div className={`w-2 h-2 ${colorNumbers} rounded-full mr-2`}></div>
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorNumbers}`}>{total}</div>
        <p className={`text-xs ${colorNumbers} mt-1`}>
          {porcentaje.toFixed(1)}% del total
        </p>
      </CardContent>
    </Card>
  );
};

export default CardDetalles;
