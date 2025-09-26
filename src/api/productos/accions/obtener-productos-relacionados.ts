import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";
import { Producto } from "../interfaces/response-productos-disponibles.interface";

export const ObtenerProductosRelacionados = async (
  categoriaId: string,
  producto: string,
  tipo: string
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/sub-servicios/categoria/${categoriaId}?producto=${producto}&tipo_categoria=${tipo}`;

  const response = await veterinariaAPI.get<Producto[]>(url);
  return response.data;
};
