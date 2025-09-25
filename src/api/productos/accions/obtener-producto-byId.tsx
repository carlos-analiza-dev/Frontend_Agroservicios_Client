import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { ResponseProductoIDInterface } from "../interfaces/response-producto-by-id.interface";

export const ObtenerProductoById = async (id: string) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/sub-servicios/producto/${id}`;

  const response = await veterinariaAPI.get<ResponseProductoIDInterface>(url);
  return response.data.producto;
};
