import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import {
  ClientePermiso,
  Departamento,
  Municipio,
  Pais,
  ProfileImage,
} from "@/interfaces/auth/cliente";

export interface AuthResponse {
  id: string;
  email: string;
  nombre: string;
  sexo: string;
  identificacion: string;
  direccion: string;
  telefono: string;
  isActive: boolean;
  createdAt: string;
  pais: Pais;
  departamento: Departamento;
  municipio: Municipio;
  profileImages: ProfileImage[];
  clientePermisos: ClientePermiso[];
  token: string;
}

export const returnUserToken = (data: AuthResponse) => {
  const { token, ...cliente } = data;

  const adaptedUser = {
    ...cliente,
    name: cliente.nombre,
  };

  return { cliente: adaptedUser, token };
};

export const authLogin = async (email: string, password: string) => {
  try {
    email = email.toLowerCase().trim();

    const { data } = await veterinariaAPI.post<AuthResponse>(
      "/auth-clientes/login",
      {
        email,
        password,
      }
    );

    if (!data) {
      return null;
    }

    return returnUserToken(data);
  } catch (error: any) {
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await veterinariaAPI.get<AuthResponse>(
      "/auth-clientes/check-status"
    );
    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};
