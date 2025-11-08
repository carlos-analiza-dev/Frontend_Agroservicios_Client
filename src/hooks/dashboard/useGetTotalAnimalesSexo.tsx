import { ObtenerTotalAnimalesSexo } from "@/api/dashboard/accions/totalAnimalesSexo";
import { useQuery } from "@tanstack/react-query";

const useGetTotalAnimalesSexo = () => {
  return useQuery({
    queryKey: ["total-animales-sexo"],
    queryFn: ObtenerTotalAnimalesSexo,
    retry: 0,
  });
};

export default useGetTotalAnimalesSexo;
