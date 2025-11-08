import { ObtenerTotalAnimalesMuerte } from "@/api/dashboard/accions/animalesMuerte";
import { useQuery } from "@tanstack/react-query";

const useGetTotalAnimalesMuerte = () => {
  return useQuery({
    queryKey: ["total-animales-muerte"],
    queryFn: ObtenerTotalAnimalesMuerte,
    retry: 0,
  });
};

export default useGetTotalAnimalesMuerte;
