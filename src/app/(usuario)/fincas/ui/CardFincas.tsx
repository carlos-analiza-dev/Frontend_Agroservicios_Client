"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Box,
  Calendar,
  CircleCheck,
  CircleX,
  PawPrint,
  Activity,
  Navigation,
} from "lucide-react";
import { useState } from "react";
import { Finca } from "@/api/fincas/interfaces/response-fincasByPropietario.interface";
import MapIframe from "@/components/generics/MapIframe";
import { formatDate } from "@/helpers/funciones/formatDate";

interface CardFincasProps {
  finca: Finca;
  onPress: () => void;
}

export const CardFincas = ({ finca, onPress }: CardFincasProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const getStatusText = (isActive: boolean) => {
    return isActive ? "Activa" : "Inactiva";
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const openGoogleMaps = () => {
    if (finca.latitud && finca.longitud) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${finca.latitud},${finca.longitud}&travelmode=driving`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="mb-4 mx-2">
      <div
        className={`transition-transform duration-200 ${isPressed ? "scale-95" : "scale-100"}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onClick={onPress}
      >
        <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg">{finca.nombre_finca}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                {finca.cantidad_animales} animales
              </span>
            </div>

            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                {finca.municipio.nombre}, {finca.departamento.nombre}
              </span>
            </div>

            <div className="flex items-center">
              <Box className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                {finca.tamaño_total} {finca.medida_finca} Totales -{" "}
                {finca.area_ganaderia} {finca.medida_finca} para ganadería
              </span>
            </div>

            <div className="flex items-start">
              <Box className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <span className="text-sm">Explotación:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {finca.tipo_explotacion.map(({ tipo_explotacion }, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tipo_explotacion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <PawPrint className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <span className="text-sm">Especies:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {finca.especies_maneja.map(({ especie, cantidad }, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {especie} - {cantidad}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                Registrada: {formatDate(finca.fecha_registro)}
              </span>
            </div>

            <div className="flex items-center">
              {finca.isActive ? (
                <CircleCheck className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <CircleX className="h-4 w-4 mr-2 text-destructive" />
              )}
              <span className="text-sm">
                Estado: {getStatusText(finca.isActive)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mt-4 mb-2">
        <h3 className="text-lg font-semibold">
          Ubicación - {finca.nombre_finca}
        </h3>
        <button
          onClick={openGoogleMaps}
          className="flex items-center text-sm text-primary hover:underline"
          title="Abrir en Google Maps"
        >
          <Navigation className="h-4 w-4 mr-1" />
          Cómo llegar
        </button>
      </div>

      {finca.latitud && finca.longitud && (
        <div className="h-48 w-full rounded-md overflow-hidden border">
          <MapIframe
            lat={finca.latitud}
            lng={finca.longitud}
            className="h-full w-full"
          />
          <div className="bg-background/80 p-2 text-center text-xs text-muted-foreground">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${finca.latitud},${finca.longitud}&travelmode=driving`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Abrir en Google Maps para direcciones
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
