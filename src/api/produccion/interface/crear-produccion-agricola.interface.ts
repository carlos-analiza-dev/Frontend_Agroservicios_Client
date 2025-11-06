export interface CrearProduccionAgricolaInterface {
  cultivos: Cultivo[];
  produccionFincaId: string;
}

export interface Cultivo {
  tipo: string;
  estacionalidad: string;
  descripcion?: string;
  tiempo_estimado_cultivo: string;
  meses_produccion: string[];
  cantidad_producida_hectareas: string;
}
