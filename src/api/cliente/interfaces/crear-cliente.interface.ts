export interface CrearCliente {
  email: string;
  password: string;
  nombre: string;
  identificacion: string;
  direccion: string;
  telefono: string;
  sexo: string;
  pais: string;
  departamento: string;
  municipio: string;
  isActive?: boolean;
}
