import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Producto } from "@/api/productos/interfaces/response-productos-disponibles.interface";
import { toast } from "react-toastify";

export interface CartItem extends Producto {
  quantity: number;
  sucursalId: string;
  nombreSucursal?: string;
  nota?: string;
  notas?: string;
  totalPrecio?: number;
}

interface CartState {
  cart: CartItem[];
  currentSucursalId: string | null;
  addToCart: (
    producto: Producto,
    sucursalId: string,
    nombreSucursal?: string,
    nota?: string
  ) => void;
  removeFromCart: (productoId: string, sucursalId: string) => void;
  increaseQuantity: (productoId: string, sucursalId: string) => void;
  decreaseQuantity: (productoId: string, sucursalId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  getItemQuantity: (productoId: string, sucursalId: string) => number;
  setCurrentSucursal: (sucursalId: string | null) => void;
  getCurrentSucursal: () => string | null;
  canAddToSucursal: (sucursalId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      currentSucursalId: null,

      addToCart: (producto, sucursalId, nombreSucursal, nota) => {
        const state = get();

        if (!state.canAddToSucursal(sucursalId)) {
          return false;
        }

        set((state) => {
          const newSucursalId =
            state.cart.length === 0 ? sucursalId : state.currentSucursalId;

          const exists = state.cart.find(
            (item) => item.id === producto.id && item.sucursalId === sucursalId
          );

          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === producto.id && item.sucursalId === sucursalId
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      totalPrecio:
                        parseFloat(item.preciosPorPais[0]?.precio ?? "0") *
                        (item.quantity + 1),
                    }
                  : item
              ),
              currentSucursalId: newSucursalId,
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...producto,
                quantity: 1,
                sucursalId,
                nombreSucursal,
                nota,
                totalPrecio: parseFloat(
                  producto.preciosPorPais[0]?.precio ?? "0"
                ),
              },
            ],
            currentSucursalId: newSucursalId,
          };
        });
      },

      removeFromCart: (productoId, sucursalId) => {
        set((state) => {
          const newCart = state.cart.filter(
            (item) =>
              !(item.id === productoId && item.sucursalId === sucursalId)
          );

          const newSucursalId =
            newCart.length === 0 ? null : state.currentSucursalId;

          return {
            cart: newCart,
            currentSucursalId: newSucursalId,
          };
        });
      },

      increaseQuantity: (productoId, sucursalId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productoId && item.sucursalId === sucursalId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrecio:
                    parseFloat(item.preciosPorPais[0]?.precio ?? "0") *
                    (item.quantity + 1),
                }
              : item
          ),
        }));
      },

      decreaseQuantity: (productoId, sucursalId) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productoId &&
              item.sucursalId === sucursalId &&
              item.quantity > 1
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    totalPrecio:
                      parseFloat(item.preciosPorPais[0]?.precio ?? "0") *
                      (item.quantity - 1),
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ cart: [], currentSucursalId: null }),

      totalItems: () => {
        return get().cart.length;
      },

      totalPrice: () => {
        return get().cart.reduce(
          (acc, item) =>
            acc +
            item.quantity * parseFloat(item.preciosPorPais[0]?.precio ?? "0"),
          0
        );
      },

      getItemQuantity: (productoId, sucursalId) => {
        const item = get().cart.find(
          (item) => item.id === productoId && item.sucursalId === sucursalId
        );
        return item ? item.quantity : 0;
      },

      setCurrentSucursal: (sucursalId) => {
        set({ currentSucursalId: sucursalId });
      },

      getCurrentSucursal: () => {
        return get().currentSucursalId;
      },

      canAddToSucursal: (sucursalId) => {
        const state = get();

        return (
          state.cart.length === 0 || state.currentSucursalId === sucursalId
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cart: state.cart,
        currentSucursalId: state.currentSucursalId,
      }),
    }
  )
);
