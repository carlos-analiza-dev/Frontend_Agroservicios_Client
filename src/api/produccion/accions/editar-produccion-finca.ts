import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { CreateProduccionFinca } from "../interface/crear-produccion-finca.interface";
import { CrearForrajeInsumoInterface } from "../interface/crear-forraje-insumo.interface";
import { ProduccionGanaderaInterface } from "../interface/crear-produccion-ganadera.interface";
import { CrearProduccionAgricolaInterface } from "../interface/crear-produccion-agricola.interface";
import { CrearProduccionApiculturaIntrerface } from "../interface/crear-produccion-apicultura.interface";
import { CrearProduccionAlternativaInterface } from "../interface/crear-produccion-alternativa.interface";

export const ActualizarProduccionFinca = async (
  id: string,
  data: Partial<CreateProduccionFinca>
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-finca/${id}`;

  const response = await veterinariaAPI.patch(url, data);
  return response.data;
};

export const ActualizarProduccionForrajes = async (
  id: string,
  data: Partial<CrearForrajeInsumoInterface>
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-forrajes-insumos/${id}`;

  const response = await veterinariaAPI.patch(url, data);
  return response.data;
};

export const ActualizarProduccionGanadera = async (
  id: string,
  data: Partial<ProduccionGanaderaInterface>
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-ganadera/${id}`;

  const response = await veterinariaAPI.patch(url, data);
  return response.data;
};

export const ActualizarProduccionAgricola = async (
  id: string,
  data: Partial<CrearProduccionAgricolaInterface>
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-agricola/${id}`;

  const response = await veterinariaAPI.patch(url, data);
  return response.data;
};

export const ActualizarProduccionApicultura = async (
  id: string,
  data: Partial<CrearProduccionApiculturaIntrerface>
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-apicultura/${id}`;

  const response = await veterinariaAPI.patch(url, data);
  return response.data;
};

export const ActualizarProduccionAlternativa = async (
  id: string,
  data: Partial<CrearProduccionAlternativaInterface>
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-alternativa/${id}`;

  const response = await veterinariaAPI.patch(url, data);
  return response.data;
};
