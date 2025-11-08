import { ObtenerFincasTipoExplotacion } from "@/api/dashboard/accions/fincasTipoExplotacion";
import { useQuery } from "@tanstack/react-query";

const useGetFincasTipoExplotacion = () => {
  return useQuery({
    queryKey: ["fincas-explotacion"],
    queryFn: ObtenerFincasTipoExplotacion,
    retry: 0,
  });
};

export default useGetFincasTipoExplotacion;
