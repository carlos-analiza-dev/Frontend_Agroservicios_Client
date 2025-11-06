export interface ResponseTratamientoAnimalInterface {
  total: number;
  tratamientos: Tratamiento[];
}

export interface Tratamiento {
  id: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  createdAt: string;
  updatedAt: string;
  subServicio: SubServicio;
  documentos: Documento[];
}

export interface Documento {
  id: string;
  nombre: string;
  url: string;
  key: string;
  mimeType: string;
  createdAt: Date;
}

export interface SubServicio {
  id: string;
  nombre: string;
  codigo: string;
  codigo_barra: string;
  atributos: string;
  tipo: string;
  unidad_venta: string;
  tipo_fraccionamiento: null;
  contenido: number;
  descripcion: string;
  servicioId: string;
  isActive: boolean;
  disponible: boolean;
  es_compra_bodega: boolean;
  compra_minima: number;
  unidad_fraccionamiento: number;
  distribucion_minima: number;
  venta_minima: number;
  createdAt: Date;
  updatedAt: Date;
  categoriaId: null;
}
