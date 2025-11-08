import { ObtenerTotalCitasCompletadas } from "@/api/dashboard/accions/totalCitasCompletadas";
import { useQuery } from "@tanstack/react-query";

const useGetTotalCitasCompletadas = () => {
  return useQuery({
    queryKey: ["total-citas-completadas"],
    queryFn: ObtenerTotalCitasCompletadas,
    retry: 0,
  });
};

export default useGetTotalCitasCompletadas;
