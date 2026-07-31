"use client";

import { create } from "zustand";

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
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (newItem) => {
    const { items } = get();
    const lineId = `${newItem.productSlug}-${newItem.size}-${newItem.color}`;
    const existing = items.find((i) => i.id === lineId);

    if (existing) {
      set({
        items: items.map((i) =>
          i.id === lineId
            ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
            : i
        ),
        isOpen: true,
      });
    } else {
      set({
        items: [...items, { ...newItem, id: lineId, quantity: newItem.quantity ?? 1 }],
        isOpen: true,
      });
    }
  },

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) => {
    if (quantity < 1) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
