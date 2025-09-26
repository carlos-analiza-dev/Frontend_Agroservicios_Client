import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Producto } from "@/api/productos/interfaces/response-productos-disponibles.interface";

interface FavoritosState {
  favoritos: Producto[];
  agregarFavorito: (producto: Producto) => void;
  removerFavorito: (productoId: string) => void;
  toggleFavorito: (producto: Producto) => void;
  esFavorito: (productoId: string) => boolean;
  limpiarFavoritos: () => void;
}

export const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set, get) => ({
      favoritos: [],

      agregarFavorito: (producto) => {
        set((state) => {
          if (state.favoritos.some((fav) => fav.id === producto.id)) {
            return state;
          }
          return { favoritos: [...state.favoritos, producto] };
        });
      },

      removerFavorito: (productoId) => {
        set((state) => ({
          favoritos: state.favoritos.filter((fav) => fav.id !== productoId),
        }));
      },

      toggleFavorito: (producto) => {
        const { esFavorito, agregarFavorito, removerFavorito } = get();
        if (esFavorito(producto.id)) {
          removerFavorito(producto.id);
        } else {
          agregarFavorito(producto);
        }
      },

      esFavorito: (productoId) => {
        return get().favoritos.some((fav) => fav.id === productoId);
      },

      limpiarFavoritos: () => {
        set({ favoritos: [] });
      },
    }),
    {
      name: "favoritos-storage",

      partialize: (state) => ({ favoritos: state.favoritos }),
    }
  )
);
