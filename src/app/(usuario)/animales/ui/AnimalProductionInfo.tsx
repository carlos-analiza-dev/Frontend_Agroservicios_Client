"use client";

import {
  TrendingUp,
  Droplet,
  GitBranch,
  Skull,
  HelpCircle,
  CurlyBraces,
} from "lucide-react";

interface Props {
  produccion?: string | null;
  tipoProduccion?: string | null;
  animalMuerto: boolean;
  razonMuerte?: string | null;
}

const AnimalProductionInfo = ({
  produccion,
  tipoProduccion,
  animalMuerto,
  razonMuerte,
}: Props) => {
  const getProductionIcon = () => {
    if (!produccion) return <HelpCircle className="w-5 h-5" />;
    switch (produccion.toLowerCase()) {
      case "engorde":
        return <TrendingUp className="w-5 h-5" />;
      case "leche":
        return <Droplet className="w-5 h-5" />;
      case "reproducción":
        return <GitBranch className="w-5 h-5" />;
      default:
        return <CurlyBraces className="w-5 h-5" />;
    }
  };

  const getProductionColor = () => {
    if (animalMuerto) return "text-red-600";
    if (!produccion) return "text-muted-foreground";
    switch (produccion.toLowerCase()) {
      case "engorde":
        return "text-blue-600";
      case "leche":
        return "text-foreground";
      case "reproducción":
        return "text-teal-600";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="space-y-2 p-2 rounded-lg bg-background">
      <div className="flex items-center gap-2">
        <span className={`${getProductionColor()}`}>{getProductionIcon()}</span>
        <p className={`${getProductionColor()} text-sm`}>
          {produccion ? (
            <>
              {produccion}
              {tipoProduccion && ` (${tipoProduccion})`}
            </>
          ) : (
            "Sin producción definida"
          )}
        </p>
      </div>

      {animalMuerto && (
        <div className="flex items-center gap-2 mt-2">
          <Skull className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-600">
            {razonMuerte && razonMuerte !== "N/D"
              ? `Muerto - ${razonMuerte}`
              : "Muerto"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimalProductionInfo;
