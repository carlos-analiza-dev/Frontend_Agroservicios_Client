import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Producto } from "@/api/productos/interfaces/response-productos-disponibles.interface";

export interface CartItem extends Producto {
  quantity: number;
  sucursalId?: string;
  nombreSucursal?: string;
  nota?: string;
  notas?: string;
  totalPrecio?: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (
    producto: Producto,
    sucursalId?: string,
    nombreSucursal?: string,
    nota?: string
  ) => void;
  removeFromCart: (productoId: string) => void;
  increaseQuantity: (productoId: string) => void;
  decreaseQuantity: (productoId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (producto, sucursalId, nombreSucursal, nota) => {
        set((state) => {
          const exists = state.cart.find((item) => item.id === producto.id);

          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === producto.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      totalPrecio:
                        parseFloat(item.preciosPorPais[0]?.precio ?? "0") *
                        (item.quantity + 1),
                    }
                  : item
              ),
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
          };
        });
      },

      removeFromCart: (productoId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productoId),
        }));
      },

      increaseQuantity: (productoId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productoId
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

      decreaseQuantity: (productoId) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productoId && item.quantity > 1
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

      clearCart: () => set({ cart: [] }),

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
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
