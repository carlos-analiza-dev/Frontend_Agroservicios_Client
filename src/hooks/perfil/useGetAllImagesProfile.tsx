import { obtenerTodasImages } from "@/api/profile-images/core/obtener-image-all-images";
import { useQuery } from "@tanstack/react-query";

const useGetAllImagesProfile = () => {
  return useQuery({
    queryKey: ["all-images-perfil"],
    queryFn: () => obtenerTodasImages(),
    staleTime: 60 * 100 * 5,
    retry: 0,
  });
};

export default useGetAllImagesProfile;
