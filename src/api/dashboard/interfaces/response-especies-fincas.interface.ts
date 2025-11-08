export interface ResponseEspeciesByFinca {
  id: string;
  nombre_finca: string;
  especies: Especie[];
  cantidad_total_especies: number;
}

export interface Especie {
  especie: string;
  cantidad: number;
}
