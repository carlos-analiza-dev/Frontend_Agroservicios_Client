import { ObtenerProduccionBovinos } from "@/api/dashboard/accions/obtener-produccion-vacas";
import { useQuery } from "@tanstack/react-query";

const useGetProduccionGanaderaFinca = () => {
  return useQuery({
    queryKey: ["produccion-ganadera-finca"],
    queryFn: ObtenerProduccionBovinos,
    retry: 0,
  });
};

export default useGetProduccionGanaderaFinca;
