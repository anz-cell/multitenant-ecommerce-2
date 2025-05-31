import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

interface TenantCart {
  productsIds: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},
      addProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productsIds: [
                ...(state.tenantCarts[tenantSlug]?.productsIds || []),
                productId,
              ],
            },
          },
        })),
      removeProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productsIds:
                state.tenantCarts[tenantSlug]?.productsIds.filter(
                  (id) => id !== productId
                ) || [],
            },
          },
        })),
      clearCart: (tenantSlug) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productsIds: [],
            },
          },
        })),
      clearAllCarts: () =>
        set({
          tenantCarts: {},
        }),
      getCartByTenant: (tenantSlug) =>
        get().tenantCarts[tenantSlug]?.productsIds || [],
    }),
    {
      name: "funroad-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
