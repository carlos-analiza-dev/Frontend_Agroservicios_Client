export interface ResponseProductosDisponibles {
  total: number;
  limit: number;
  offset: number;
  productos: Producto[];
  hasMore: boolean;
}

export interface Producto {
  id: string;
  nombre: string;
  codigo: string;
  codigo_barra: string;
  atributos: string;
  tipo: string;
  unidad_venta: string;
  tipo_fraccionamiento: null | string;
  contenido: number;
  descripcion: string;
  servicioId: null;
  isActive: boolean;
  disponible: boolean;
  es_compra_bodega: boolean;
  compra_minima: number;
  unidad_fraccionamiento: number;
  distribucion_minima: number;
  venta_minima: number;
  createdAt: Date;
  updatedAt: Date;
  categoriaId: string;
  preciosPorPais: PreciosPorPai[];
  marca: Categoria;
  proveedor: Proveedor;
  categoria: Categoria;
  tax: Tax;
  imagenes: any[];
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  pais_origen?: string;
}

export interface PreciosPorPai {
  id: string;
  precio: string;
  costo: string;
  tiempo: null;
  cantidadMin: null;
  cantidadMax: null;
}

export interface Proveedor {
  id: string;
  nit_rtn: string;
  nrc: string;
  nombre_legal: string;
  complemento_direccion: string;
  telefono: string;
  correo: string;
  nombre_contacto: string;
  plazo: number | null;
  tipo_escala: string;
  is_active: boolean;
  tipo_pago_default: string;
  created_at: Date;
  updated_at: Date;
}

export interface Tax {
  id: string;
  nombre: string;
  porcentaje: string;
}
