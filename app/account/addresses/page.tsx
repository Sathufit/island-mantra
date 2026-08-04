"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/src/store/customer";
import type { MedusaCustomerAddress } from "@/src/lib/medusa/client";

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  address_1: "",
  city: "",
  phone: "",
};

export default function AddressesPage() {
  const router = useRouter();
  const {
    token,
    hasHydrated,
    customer,
    hydrateCustomer,
    addAddress,
    updateAddress,
    removeAddress,
  } = useCustomer();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // See app/account/orders/page.tsx — wait for persisted-state rehydration
    // before redirecting a visitor who's actually still logged in.
    if (!hasHydrated) return;
    if (!token) {
      router.replace("/account");
    }
  }, [hasHydrated, token, router]);

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const startEdit = (address: MedusaCustomerAddress) => {
    setForm({
      first_name: address.first_name ?? "",
      last_name: address.last_name ?? "",
      address_1: address.address_1 ?? "",
      city: address.city ?? "",
      phone: address.phone ?? "",
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const startAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateAddress(editingId, form);
    } else {
      await addAddress({ ...form, country_code: "lk" });
    }
    await hydrateCustomer();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await removeAddress(id);
  };

  if (!customer) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <p className="font-sans text-sm text-[#0A0A0A]/50">Loading…</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl text-[#0A0A0A]">Addresses</h1>
          <Link
            href="/account"
            className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
          >
            Back to Account
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          {customer.addresses.length === 0 && !showForm && (
            <p className="font-sans text-sm text-[#0A0A0A]/60">
              No saved addresses yet.
            </p>
          )}
          {customer.addresses.map((address) => (
            <div
              key={address.id}
              className="border border-[#E7DCC8] p-5 flex items-start justify-between"
            >
              <div>
                <p className="font-serif text-sm text-[#0A0A0A]">
                  {address.first_name} {address.last_name}
                  {address.is_default_shipping && (
                    <span className="ml-2 font-sans text-[10px] tracking-widest uppercase bg-[#F4EDE1] px-2 py-0.5">
                      Default
                    </span>
                  )}
                </p>
                <p className="font-sans text-xs text-[#0A0A0A]/60 mt-1">
                  {address.address_1}, {address.city}
                  <br />
                  {address.phone}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(address)}
                  className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-4 border-t border-[#E7DCC8] pt-8">
            <h2 className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A]">
              {editingId ? "Edit Address" : "New Address"}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="First name"
                value={form.first_name}
                onChange={update("first_name")}
                className="border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
              />
              <input
                required
                placeholder="Last name"
                value={form.last_name}
                onChange={update("last_name")}
                className="border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>
            <input
              required
              placeholder="Address"
              value={form.address_1}
              onChange={update("address_1")}
              className="w-full border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="City"
                value={form.city}
                onChange={update("city")}
                className="border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
              />
              <input
                required
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={update("phone")}
                className="border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase py-3 hover:bg-[#2A2A2A] transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 border border-[#E7DCC8] text-[#0A0A0A] font-sans text-xs tracking-widest uppercase py-3 hover:border-[#0A0A0A] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={startAdd}
            className="w-full border border-[#0A0A0A] text-[#0A0A0A] font-sans text-xs tracking-widest uppercase py-4 hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            Add New Address
          </button>
        )}
      </div>
    </div>
  );
}
