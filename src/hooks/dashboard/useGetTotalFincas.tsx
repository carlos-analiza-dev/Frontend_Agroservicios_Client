import { ObtenerTotalFincas } from "@/api/dashboard/accions/totalFincas";
import { useQuery } from "@tanstack/react-query";

const useGetTotalFincas = () => {
  return useQuery({
    queryKey: ["total-fincas"],
    queryFn: ObtenerTotalFincas,
    retry: 0,
  });
};

export default useGetTotalFincas;
