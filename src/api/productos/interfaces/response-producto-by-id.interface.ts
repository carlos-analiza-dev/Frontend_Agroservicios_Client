export interface ResponseProductoIDInterface {
  producto: Producto;
}

export interface Producto {
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
  marca: Marca;
  proveedor: Proveedor;
  categoria: Categoria;
  tax: Tax;
  imagenes: Imagene[];
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Imagene {
  id: string;
  url: string;
  key: string;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Marca {
  id: string;
  nombre: string;
  pais_origen: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: AtedBy;
  updated_by: AtedBy;
}

export interface AtedBy {
  id: string;
  email: string;
  password: string;
  name: string;
  identificacion: string;
  direccion: string;
  sexo: string;
  telefono: string;
  isActive: boolean;
  isAuthorized: boolean;
  createdAt: Date;
}

export interface PreciosPorPai {
  id: string;
  precio: string;
  costo: string;
  tiempo: null;
  cantidadMin: null;
  cantidadMax: null;
  pais: Pais;
}

export interface Pais {
  id: string;
  nombre: string;
  code: string;
  code_phone: string;
  nombre_moneda: string;
  simbolo_moneda: string;
  nombre_documento: string;
  isActive: boolean;
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
  plazo: null;
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
  pais: Pais;
}
