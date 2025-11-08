import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  titulo: string;
  total: number;
  sub_titulo: string;
}

const CardTotales = ({ sub_titulo, titulo, total }: Props) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{total}</div>
          <p className="text-sm text-gray-600">{sub_titulo}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTotales;
