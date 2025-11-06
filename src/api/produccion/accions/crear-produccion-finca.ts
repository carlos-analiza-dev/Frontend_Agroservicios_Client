import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { CreateProduccionFinca } from "../interface/crear-produccion-finca.interface";
import { ProduccionGanaderaInterface } from "../interface/crear-produccion-ganadera.interface";
import { CrearForrajeInsumoInterface } from "../interface/crear-forraje-insumo.interface";
import { CrearProduccionAgricolaInterface } from "../interface/crear-produccion-agricola.interface";
import { CrearProduccionApiculturaIntrerface } from "../interface/crear-produccion-apicultura.interface";
import { CrearProduccionAlternativaInterface } from "../interface/crear-produccion-alternativa.interface";

export const CrearProduccionFinca = async (data: CreateProduccionFinca) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-finca`;

  const response = await veterinariaAPI.post(url, data);
  return response.data;
};

export const CrearProduccionGanadera = async (
  data: ProduccionGanaderaInterface
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-ganadera`;

  const response = await veterinariaAPI.post(url, data);
  return response.data;
};

export const CrearProduccionForrajes = async (
  data: CrearForrajeInsumoInterface
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-forrajes-insumos`;

  const response = await veterinariaAPI.post(url, data);
  return response.data;
};

export const CrearProduccionAgricola = async (
  data: CrearProduccionAgricolaInterface
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-agricola`;

  const response = await veterinariaAPI.post(url, data);
  return response.data;
};

export const CrearProduccionApicultura = async (
  data: CrearProduccionApiculturaIntrerface
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-apicultura`;

  const response = await veterinariaAPI.post(url, data);
  return response.data;
};

export const CrearProduccionAlternativa = async (
  data: CrearProduccionAlternativaInterface
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/produccion-alternativa`;

  const response = await veterinariaAPI.post(url, data);
  return response.data;
};
