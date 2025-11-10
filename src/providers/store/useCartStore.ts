import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Producto } from "@/api/productos/interfaces/response-productos-disponibles.interface";

export interface CartItem extends Producto {
  quantity: number;
  sucursalId: string;
  nombreSucursal?: string;
  nota?: string;
  notas?: string;
  totalPrecio?: number;
}

export interface ImpuestosCalculados {
  sub_total: number;
  importe_exento: number;
  importe_exonerado: number;
  importe_gravado_15: number;
  importe_gravado_18: number;
  isv_15: number;
  isv_18: number;
  total_impuestos: number;
  total_general: number;
  descuentos_rebajas?: number;
  total_con_descuento?: number;
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

  calcularImpuestos: () => ImpuestosCalculados;
  getSubTotal: () => number;
  getTotalISV: () => number;
  getTotalGeneral: () => number;
  procesarDetallesCarrito: () => {
    detalles: any[];
    totales: {
      subTotal: number;
      importeGravado15: number;
      importeGravado18: number;
      isv15: number;
      isv18: number;
    };
  };
  determinarTasaImpuesto: (item: CartItem) => number;
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
                        parseFloat(item.preciosPorPais?.[0]?.precio ?? "0") *
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
                  producto.preciosPorPais?.[0]?.precio ?? "0"
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
                    parseFloat(item.preciosPorPais?.[0]?.precio ?? "0") *
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
                      parseFloat(item.preciosPorPais?.[0]?.precio ?? "0") *
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
            item.quantity * parseFloat(item.preciosPorPais?.[0]?.precio ?? "0"),
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

      getSubTotal: () => {
        return get().cart.reduce(
          (acc, item) =>
            acc +
            item.quantity * parseFloat(item.preciosPorPais?.[0]?.precio ?? "0"),
          0
        );
      },

      getTotalISV: () => {
        const impuestos = get().calcularImpuestos();
        return impuestos.total_impuestos;
      },

      getTotalGeneral: () => {
        const impuestos = get().calcularImpuestos();
        return impuestos.total_general;
      },

      determinarTasaImpuesto: (item: CartItem): number => {
        if (!item) return 0.15;

        if (item.tax) {
          return Number(item.tax.porcentaje) / 100;
        }

        if (item.categoria?.nombre) {
          const categoriaNombre = item.categoria.nombre.toLowerCase();
          switch (categoriaNombre) {
            case "exento":
            case "exentos":
              return 0;
            case "15%":
            case "gravado 15":
              return 0.15;
            case "18%":
            case "gravado 18":
              return 0.18;
            case "exonerado":
              return 0;
          }
        }

        if (item.tipo === "servicio") {
          return 0.15;
        }

        return 0.15;
      },

      procesarDetallesCarrito: () => {
        const cart = get().cart;

        let subTotal = 0;
        let importeGravado15 = 0;
        let importeGravado18 = 0;
        let isv15 = 0;
        let isv18 = 0;

        const detalles = cart.map((item) => {
          const precio = parseFloat(item.preciosPorPais?.[0]?.precio ?? "0");
          const totalLinea = precio * item.quantity;
          subTotal += totalLinea;

          const tasaImpuesto = get().determinarTasaImpuesto(item);

          if (tasaImpuesto === 0.15) {
            importeGravado15 += totalLinea;
            isv15 += totalLinea * 0.15;
          } else if (tasaImpuesto === 0.18) {
            importeGravado18 += totalLinea;
            isv18 += totalLinea * 0.18;
          }

          return {
            id_producto: item.id,
            cantidad: item.quantity,
            precio: precio,
            total: totalLinea,
          };
        });

        return {
          detalles,
          totales: {
            subTotal: Number(subTotal.toFixed(2)),
            importeGravado15: Number(importeGravado15.toFixed(2)),
            importeGravado18: Number(importeGravado18.toFixed(2)),
            isv15: Number(isv15.toFixed(2)),
            isv18: Number(isv18.toFixed(2)),
          },
        };
      },

      calcularImpuestos: (): ImpuestosCalculados => {
        const { detalles, totales } = get().procesarDetallesCarrito();

        const subTotal = totales.subTotal;
        const importeGravadoTotal =
          totales.importeGravado15 + totales.importeGravado18;
        const importeExentoExonerado = Math.max(
          0,
          subTotal - importeGravadoTotal
        );

        const importeExento = importeExentoExonerado * 0.5;
        const importeExonerado = importeExentoExonerado * 0.5;

        const totalImpuestos = totales.isv15 + totales.isv18;
        const totalGeneral = subTotal + totalImpuestos;

        return {
          sub_total: subTotal,
          importe_exento: Number(importeExento.toFixed(2)),
          importe_exonerado: Number(importeExonerado.toFixed(2)),
          importe_gravado_15: totales.importeGravado15,
          importe_gravado_18: totales.importeGravado18,
          isv_15: totales.isv15,
          isv_18: totales.isv18,
          total_impuestos: totalImpuestos,
          total_general: totalGeneral,
        };
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
