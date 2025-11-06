export interface CrearProduccionAlternativaInterface {
  produccionFincaId: string;
  actividades: Actividade[];
}

export interface Actividade {
  tipo: string;
  cantidad_producida: string;
  unidad_medida?: string;
  ingresos_anuales?: number;
  descripcion?: string;
}
