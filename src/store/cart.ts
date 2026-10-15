"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createCart,
  addLineItem,
  updateLineItem,
  removeLineItem,
  getCart,
  isGone,
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

/** False only when the backend confirms the cart is gone or already ordered. */
async function cartIsUsable(cartId: string): Promise<boolean> {
  try {
    const cart = await getCart(cartId);
    return !cart.completed_at;
  } catch (err) {
    if (isGone(err)) return false;
    throw err;
  }
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
        let targetId = get().cartId ?? (await createCart()).id;
        let cart;
        try {
          cart = await addLineItem(targetId, variantId, quantity);
        } catch (err) {
          // Start a fresh cart only if the old one is truly gone or already
          // ordered; a timeout must not throw away what's in the bag.
          if (await cartIsUsable(targetId)) throw err;
          targetId = (await createCart()).id;
          cart = await addLineItem(targetId, variantId, quantity);
        }
        // Always store the id together with the items it produced, so the bag
        // can never show items without a cart to check out.
        const items = mapCart(cart);
        set({ cartId: targetId, items, justAdded: findAdded(items, variantId), cartLoaded: true });
      },

      removeItem: async (id) => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          await removeLineItem(cartId, id);
        } finally {
          await get().hydrateCart();
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
          if (get().cartId === cartId) set({ items: mapCart(cart) });
        } catch {
          // Leave the bag as the backend has it rather than wiping it.
          await get().hydrateCart();
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
          // Ignore the answer if the bag moved to another cart meanwhile.
          if (get().cartId !== cartId) return;
          if (cart.completed_at) {
            // Already turned into an order (e.g. in another tab) — start fresh.
            set({ cartId: null, items: [], cartLoaded: true });
          } else {
            set({ items: mapCart(cart), cartLoaded: true });
          }
        } catch (err) {
          if (get().cartId !== cartId) return;
          if (isGone(err)) {
            // The cart no longer exists (expired, or from another environment).
            set({ cartId: null, items: [], cartLoaded: true });
          } else {
            // Timeout or server hiccup: keep the cart id and whatever we
            // already show; a later load will fill it in.
            set({ cartLoaded: true });
          }
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
