import { veterinariaAPI } from "@/helpers/api/veterinariaAPI";

export const ObtenerExistenciaProductoBySucursal = async (
  productoId: string,
  sucursalId: string
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/lotes/existencia/producto/${productoId}/sucursal/${sucursalId}`;

  const response = await veterinariaAPI.get<number>(url);
  return response.data;
};
