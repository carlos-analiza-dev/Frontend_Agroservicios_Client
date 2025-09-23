import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseProductosDisponibles } from "../interfaces/response-productos-disponibles.interface";

export const ObtenerProductos = async ({
  pageParam = 0,
  limit = 10,
}: {
  pageParam?: number;
  limit?: number;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/sub-servicios/productos-disponibles-clientes?limit=${limit}&offset=${pageParam}`;

  const response = await veterinariaAPI.get<ResponseProductosDisponibles>(url);
  return response.data;
};
