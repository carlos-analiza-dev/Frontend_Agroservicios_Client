import { ObtenerEspeciesFincas } from "@/api/dashboard/accions/obtener-especies-finca";
import { useQuery } from "@tanstack/react-query";

const useGetEspeciesByFincas = () => {
  return useQuery({
    queryKey: ["especies-finca"],
    queryFn: ObtenerEspeciesFincas,
    retry: 0,
  });
};

export default useGetEspeciesByFincas;
