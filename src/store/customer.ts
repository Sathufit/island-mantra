"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  registerCustomer,
  loginCustomer,
  getCustomer,
  updateCustomer,
  addAddress,
  updateAddress,
  deleteAddress,
  type MedusaCustomer,
  type MedusaAddress,
} from "@/src/lib/medusa/client";

interface CustomerStore {
  token: string | null;
  customer: MedusaCustomer | null;
  isLoggedIn: boolean;
  /** True once zustand's localStorage rehydration has resolved. `token` is
   * `null` until then even for an already-logged-in visitor — pages must
   * wait for this before deciding whether to redirect out. */
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrateCustomer: () => Promise<void>;
  updateProfile: (update: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) => Promise<void>;
  addAddress: (
    address: MedusaAddress & { is_default_shipping?: boolean }
  ) => Promise<void>;
  updateAddress: (
    addressId: string,
    address: Partial<MedusaAddress>
  ) => Promise<void>;
  removeAddress: (addressId: string) => Promise<void>;
}

export const useCustomer = create<CustomerStore>()(
  persist(
    (set, get) => ({
      token: null,
      customer: null,
      isLoggedIn: false,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      register: async (email, password, firstName, lastName) => {
        const { token, customer } = await registerCustomer(
          email,
          password,
          firstName,
          lastName
        );
        set({ token, customer, isLoggedIn: true });
      },

      login: async (email, password) => {
        const { token, customer } = await loginCustomer(email, password);
        set({ token, customer, isLoggedIn: true });
      },

      logout: () => set({ token: null, customer: null, isLoggedIn: false }),

      hydrateCustomer: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const customer = await getCustomer(token);
          set({ customer, isLoggedIn: true });
        } catch {
          set({ token: null, customer: null, isLoggedIn: false });
        }
      },

      updateProfile: async (update) => {
        const { token } = get();
        if (!token) return;
        const customer = await updateCustomer(token, update);
        set({ customer });
      },

      addAddress: async (address) => {
        const { token } = get();
        if (!token) return;
        const customer = await addAddress(token, address);
        set({ customer });
      },

      updateAddress: async (addressId, address) => {
        const { token } = get();
        if (!token) return;
        const customer = await updateAddress(token, addressId, address);
        set({ customer });
      },

      removeAddress: async (addressId) => {
        const { token } = get();
        if (!token) return;
        await deleteAddress(token, addressId);
        const customer = await getCustomer(token);
        set({ customer });
      },
    }),
    {
      name: "island-mantra-customer",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
