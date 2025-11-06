import { InsumoTipo } from "./crear-produccion-finca.interface";

export interface CrearForrajeInsumoInterface {
  insumos: Insumo[];
  produccionFincaId: string;
}

export interface Insumo {
  tipo: InsumoTipo;
  tipo_heno?: string;
  estacionalidad_heno?: string;
  meses_produccion_heno?: string[];
  tiempo_estimado_cultivo?: string;
  produccion_manzana?: string;
  descripcion_otro?: string;
}
