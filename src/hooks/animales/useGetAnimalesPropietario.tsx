import { ObtenerAnimales } from "@/api/animales/accions/get-animales-bypropietario";
import { useQuery } from "@tanstack/react-query";

const useGetAnimalesPropietario = (id: string) => {
  return useQuery({
    queryKey: ["animales-propietario", id],
    queryFn: () => ObtenerAnimales(id),
    retry: 0,
  });
};

export default useGetAnimalesPropietario;
