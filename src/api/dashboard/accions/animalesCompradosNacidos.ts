import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { AnimalesCompradosNacidosInterface } from "../interfaces/animales-comprados-nacidos.interface";

export const ObtenerTotalAnimalesCompradosNacidos = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboards/animales-comprados-nacidos`;

  const response =
    await veterinariaAPI.get<AnimalesCompradosNacidosInterface>(url);
  return response.data;
};
