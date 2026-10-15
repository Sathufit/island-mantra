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
  variantId: string;
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
  /** The line item that was most recently added, for the "added to your
   * bag" toast. Cleared when the toast is dismissed. */
  justAdded: CartItem | null;
  /** True once zustand's localStorage rehydration has resolved. `cartId` is
   * `null` until then even for a visitor with an existing cart. */
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  /** True once the cart's *contents* have been fetched from the backend at
   * least once this session (or determined there's no cart to fetch). Items
   * stay `[]` while this is false even for a returning visitor with a real
   * cart, since hydrateCart's network call takes a moment — pages must wait
   * for this, not just hasHydrated, before treating the bag as empty. */
  cartLoaded: boolean;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  hydrateCart: () => Promise<void>;
  dismissAdded: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

function findAdded(items: CartItem[], variantId: string): CartItem | null {
  return items.find((i) => i.variantId === variantId) ?? items[items.length - 1] ?? null;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      justAdded: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      cartLoaded: false,

      addItem: async (variantId, quantity = 1) => {
        const { cartId } = get();
        try {
          const targetCartId = cartId ?? (await createCart()).id;
          if (!cartId) set({ cartId: targetCartId });
          const cart = await addLineItem(targetCartId, variantId, quantity);
          const items = mapCart(cart);
          set({ items, justAdded: findAdded(items, variantId) });
        } catch {
          // cartId was stale (e.g. left over from a different environment,
          // or the cart expired) — start a fresh cart and retry once before
          // giving up, so a bad cached cart ID self-heals silently instead
          // of the button just doing nothing.
          const cart = await createCart();
          set({ cartId: cart.id });
          const updated = await addLineItem(cart.id, variantId, quantity);
          const items = mapCart(updated);
          set({ items, justAdded: findAdded(items, variantId) });
        }
      },

      removeItem: async (id) => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          await removeLineItem(cartId, id);
          const cart = await getCart(cartId);
          set({ items: mapCart(cart) });
        } catch {
          set({ cartId: null, items: [] });
        }
      },

      updateQuantity: async (id, quantity) => {
        if (quantity < 1) {
          await get().removeItem(id);
          return;
        }
        const { cartId } = get();
        if (!cartId) return;
        try {
          const cart = await updateLineItem(cartId, id, quantity);
          set({ items: mapCart(cart) });
        } catch {
          set({ cartId: null, items: [] });
        }
      },

      clearCart: () => set({ cartId: null, items: [] }),

      hydrateCart: async () => {
        const { cartId } = get();
        if (!cartId) {
          set({ cartLoaded: true });
          return;
        }
        try {
          const cart = await getCart(cartId);
          set({ items: mapCart(cart), cartLoaded: true });
        } catch {
          // Stale/invalid cart id (e.g. from a different environment) —
          // drop it rather than leaving the app stuck on a cart that will
          // 404 on every subsequent operation.
          set({ cartId: null, items: [], cartLoaded: true });
        }
      },

      dismissAdded: () => set({ justAdded: null }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "island-mantra-cart",
      partialize: (state) => ({ cartId: state.cartId }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
