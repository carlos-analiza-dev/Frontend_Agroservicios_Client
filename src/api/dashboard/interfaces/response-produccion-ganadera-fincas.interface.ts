export interface ResponseProduccionGanaderaByFinca {
  total_vacas_ordeño: number;
  total_vacas_secas: number;
  total_terneros: number;
  total_bovinos: number;
  fincas_con_produccion_leche: number;
  fincas: Finca[];
}

export interface Finca {
  id: string;
  nombre_finca: string;
  vacas_ordeño: number;
  vacas_secas: number;
  terneros: number;
  total_bovinos: number;
  tiene_produccion_leche: boolean;
}
