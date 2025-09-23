export interface Municipio {
  id: string;
  nombre: string;
  isActive: boolean;
}

export interface Departamento {
  id: string;
  nombre: string;
  isActive: boolean;
  municipios?: Municipio[];
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
  departamentos: Departamento[];
}

export interface ProfileImage {
  id: string;
  url: string;
  key: string;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cliente {
  id: string;
  email: string;
  name: string;
  identificacion: string;
  direccion: string;
  sexo: string;
  telefono: string;
  isActive: boolean;
  createdAt: string;
  pais: Pais;
  departamento: Departamento;
  municipio: Municipio;
  profileImages: ProfileImage[];
}

export type ClienteUpdateData = {
  email: string;
  nombre: string;
  identificacion: string;
  direccion: string;
  sexo: string;
  telefono: string;
  pais: string;
  departamento: string;
  municipio: string;
  isActive: boolean;
};
