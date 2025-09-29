import { useFavoritosStore } from "@/providers/store/useFavoritosStore";

export const useFavoritos = () => {
  const {
    favoritos,
    agregarFavorito,
    removerFavorito,
    toggleFavorito,
    esFavorito,
    limpiarFavoritos,
  } = useFavoritosStore();

  return {
    favoritos,
    cantidadFavoritos: favoritos.length,
    agregarFavorito,
    removerFavorito,
    toggleFavorito,
    esFavorito,
    limpiarFavoritos,
  };
};
