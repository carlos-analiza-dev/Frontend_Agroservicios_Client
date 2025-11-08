import { ObtenerTotalAnimalesCompradosNacidos } from "@/api/dashboard/accions/animalesCompradosNacidos";
import { useQuery } from "@tanstack/react-query";

const useGetTotalAnimalesCompradosNacidos = () => {
  return useQuery({
    queryKey: ["animales-comprados-nacidos"],
    queryFn: ObtenerTotalAnimalesCompradosNacidos,
    retry: 0,
  });
};

export default useGetTotalAnimalesCompradosNacidos;
