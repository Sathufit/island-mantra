"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/src/store/cart";
import { useCustomer } from "@/src/store/customer";
import { formatPrice } from "@/src/lib/utils";
import {
  setCartAddressAndEmail,
  listShippingOptions,
  addShippingMethod,
  initiatePaymentSession,
  completeCart,
  attachCustomerToCart,
} from "@/src/lib/medusa/client";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  city: string;
}

const EMPTY_FORM: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address1: "",
  city: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartId,
    items,
    subtotal,
    hasHydrated,
    cartLoaded,
    hydrateCart,
    clearCart,
  } = useCart();
  const { isLoggedIn, token, customer } = useCustomer();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal();

  useEffect(() => {
    if (hasHydrated) hydrateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  useEffect(() => {
    if (!customer) return;
    const defaultAddress =
      customer.addresses.find((a) => a.is_default_shipping) ??
      customer.addresses[0];
    setForm((f) => ({
      ...f,
      email: customer.email,
      firstName: defaultAddress?.first_name ?? f.firstName,
      lastName: defaultAddress?.last_name ?? f.lastName,
      address1: defaultAddress?.address_1 ?? f.address1,
      city: defaultAddress?.city ?? f.city,
      phone: defaultAddress?.phone ?? f.phone,
    }));
  }, [customer]);

  const update =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartId) {
      setError("Your bag is empty.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      if (isLoggedIn && token) {
        await attachCustomerToCart(cartId, token);
      }

      await setCartAddressAndEmail(cartId, form.email, {
        first_name: form.firstName,
        last_name: form.lastName,
        address_1: form.address1,
        city: form.city,
        phone: form.phone,
        country_code: "lk",
      });

      const options = await listShippingOptions(cartId);
      if (options[0]) {
        await addShippingMethod(cartId, options[0].id);
      }

      await initiatePaymentSession(cartId, "pp_system_default");

      const result = await completeCart(cartId);
      if (result.type === "order" && result.order) {
        clearCart();
        router.push(`/checkout/confirmation?order=${result.order.display_id}`);
      } else {
        setError("We couldn't place your order. Please try again.");
      }
    } catch {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cartLoaded) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <p className="font-sans text-sm text-[#0A0A0A]/50">Loading…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl text-[#0A0A0A] mb-4">
            Your bag is empty
          </h1>
          <p className="font-sans text-sm text-[#0A0A0A]/70 mb-8">
            Add something to your bag before checking out.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#2A2A2A] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-4">
                Contact
              </h2>
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={update("email")}
                className="w-full border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>

            <div>
              <h2 className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  required
                  placeholder="First name"
                  value={form.firstName}
                  onChange={update("firstName")}
                  className="border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
                <input
                  required
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={update("lastName")}
                  className="border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>
              <input
                required
                placeholder="Address"
                value={form.address1}
                onChange={update("address1")}
                className="w-full border border-[#E7DCC8] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] mb-3"
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
            </div>

            <div>
              <h2 className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-4">
                Payment
              </h2>
              <div className="border border-[#0A0A0A] px-4 py-3 flex items-center gap-3">
                <span className="w-4 h-4 rounded-full border-2 border-[#0A0A0A] bg-[#0A0A0A]" />
                <span className="font-sans text-sm text-[#0A0A0A]">
                  Cash on Delivery
                </span>
              </div>
              <p className="font-sans text-xs text-[#0A0A0A]/50 mt-2">
                Pay in cash when your order arrives. Card and BNPL payments are
                coming soon.
              </p>
            </div>

            {error && (
              <p className="font-sans text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0A0A0A] text-white font-sans text-sm tracking-widest uppercase py-4 hover:bg-[#2A2A2A] transition-colors disabled:opacity-50"
            >
              {submitting ? "Placing Order…" : "Place Order"}
            </button>
          </form>

          <div className="md:col-span-1">
            <div className="bg-[#F4EDE1] p-6 sticky top-24">
              <h2 className="font-serif text-xl text-[#0A0A0A] mb-6">
                Order Summary
              </h2>
              <ul className="space-y-3 mb-5">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between font-sans text-sm text-[#0A0A0A]"
                  >
                    <span className="text-[#0A0A0A]/70">
                      {item.productName} ({item.size} · {item.color}) ×{" "}
                      {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#E7DCC8] pt-3 flex justify-between font-medium text-[#0A0A0A]">
                <span>Subtotal</span>
                <span className="font-serif text-lg">{formatPrice(total)}</span>
              </div>
              <p className="font-sans text-xs text-[#0A0A0A]/50 mt-2">
                Shipping calculated after address
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
