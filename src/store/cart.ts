"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createCart,
  addLineItem,
  updateLineItem,
  removeLineItem,
  getCart,
} from "@/src/lib/medusa/client";
import { mapCart } from "@/src/lib/medusa/map";

export interface CartItem {
  id: string;
  productSlug: string;
  productName: string;
  price: number;
  image: string;
  imageAlt: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartStore {
  cartId: string | null;
  items: CartItem[];
  isOpen: boolean;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  hydrateCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      isOpen: false,

      addItem: async (variantId, quantity = 1) => {
        let { cartId } = get();
        if (!cartId) {
          const cart = await createCart();
          cartId = cart.id;
          set({ cartId });
        }
        const cart = await addLineItem(cartId, variantId, quantity);
        set({ items: mapCart(cart), isOpen: true });
      },

      removeItem: async (id) => {
        const { cartId } = get();
        if (!cartId) return;
        await removeLineItem(cartId, id);
        const cart = await getCart(cartId);
        set({ items: mapCart(cart) });
      },

      updateQuantity: async (id, quantity) => {
        if (quantity < 1) {
          await get().removeItem(id);
          return;
        }
        const { cartId } = get();
        if (!cartId) return;
        const cart = await updateLineItem(cartId, id, quantity);
        set({ items: mapCart(cart) });
      },

      clearCart: () => set({ cartId: null, items: [] }),

      hydrateCart: async () => {
        const { cartId } = get();
        if (!cartId) return;
        const cart = await getCart(cartId);
        set({ items: mapCart(cart) });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "island-mantra-cart",
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);
