import { ObtenerTotalAnimales } from "@/api/dashboard/accions/totalAnimales";
import { useQuery } from "@tanstack/react-query";

const useGetTotalAnimales = () => {
  return useQuery({
    queryKey: ["total-animales"],
    queryFn: ObtenerTotalAnimales,
    retry: 0,
  });
};

export default useGetTotalAnimales;
