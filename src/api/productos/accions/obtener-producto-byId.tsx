import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { Producto } from "../interfaces/response-productos-disponibles.interface";

export const ObtenerProductoById = async (id: string) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/sub-servicios/producto/${id}`;

  const response = await veterinariaAPI.get<Producto>(url);
  return response.data;
};
