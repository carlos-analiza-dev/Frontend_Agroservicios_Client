import { ObtenerPedidosByCliente } from "@/api/pedidos/accions/obtener-pedidos-cliente";
import { useQuery } from "@tanstack/react-query";

const useGetPedidosCliente = (
  limit: number = 10,
  offset: number = 0,
  estado: string = ""
) => {
  return useQuery({
    queryKey: ["pedidos-cliente", limit, offset, estado],
    queryFn: () => ObtenerPedidosByCliente(limit, offset, estado),
    retry: false,
  });
};

export default useGetPedidosCliente;
