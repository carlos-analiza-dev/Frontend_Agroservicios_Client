import { ObtenerPedidosByCliente } from "@/api/pedidos/accions/obtener-pedidos-cliente";
import { useQuery } from "@tanstack/react-query";

const useGetPedidosCliente = (limit: number = 10, offset: number = 0) => {
  return useQuery({
    queryKey: ["pedidos-cliente", limit, offset],
    queryFn: () => ObtenerPedidosByCliente(limit, offset),
    retry: false,
  });
};

export default useGetPedidosCliente;
