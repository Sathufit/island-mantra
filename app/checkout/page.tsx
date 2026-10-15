"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/src/store/cart";
import { useCustomer } from "@/src/store/customer";
import { formatPrice } from "@/src/lib/utils";
import { paymentMethods, type PaymentMethodId } from "@/src/lib/data/payments";
import SunsetLoader from "@/src/components/ui/SunsetLoader";
import {
  setCartAddressAndEmail,
  listShippingOptions,
  addShippingMethod,
  initiatePaymentSession,
  completeCart,
  attachCustomerToCart,
  type MedusaShippingOption,
} from "@/src/lib/medusa/client";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  city: string;
}

const EMPTY_FORM: FormState = { email: "", firstName: "", lastName: "", phone: "", address1: "", city: "" };

function Field({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="caps mb-2 block text-[10px] text-muted">{label}</span>
      <input {...props} className="field-box" />
    </label>
  );
}

function Choice({
  checked,
  disabled,
  onSelect,
  title,
  aside,
  note,
  name,
}: {
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
  title: string;
  aside?: string;
  note?: string;
  name: string;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-4 border p-4 transition-colors duration-300 ${
        checked ? "border-ink bg-paper" : "border-line bg-paper/60 hover:border-ink/40"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <input type="radio" name={name} checked={checked} disabled={disabled} onChange={onSelect} className="sr-only" />
      <span
        aria-hidden
        className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${checked ? "border-ink" : "border-line"}`}
      >
        <span className={`h-2 w-2 rounded-full bg-ink transition-transform duration-300 ${checked ? "scale-100" : "scale-0"}`} />
      </span>
      <span className="flex-1">
        <span className="flex justify-between gap-4 text-[14px]">
          <span>{title}</span>
          {aside && <span className="text-muted">{aside}</span>}
        </span>
        {note && <span className="mt-1 block text-[12px] leading-relaxed text-muted">{note}</span>}
      </span>
    </label>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartId, items, subtotal, cartLoaded, clearCart } = useCart();
  const { isLoggedIn, token, customer } = useCustomer();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [shippingOptions, setShippingOptions] = useState<MedusaShippingOption[]>([]);
  const [shippingId, setShippingId] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentMethodId>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal();
  const selectedShipping = shippingOptions.find((o) => o.id === shippingId);
  const deliveryAmount = selectedShipping?.amount ?? null;

  useEffect(() => {
    if (!cartId || items.length === 0) return;
    listShippingOptions(cartId)
      .then((opts) => {
        setShippingOptions(opts);
        setShippingId((cur) => cur ?? opts[0]?.id ?? null);
      })
      .catch(() => setShippingOptions([]));
  }, [cartId, items.length]);

  useEffect(() => {
    if (!customer) return;
    const a = customer.addresses.find((x) => x.is_default_shipping) ?? customer.addresses[0];
    setForm((f) => ({
      ...f,
      email: customer.email,
      firstName: a?.first_name ?? customer.first_name ?? f.firstName,
      lastName: a?.last_name ?? customer.last_name ?? f.lastName,
      address1: a?.address_1 ?? f.address1,
      city: a?.city ?? f.city,
      phone: a?.phone ?? customer.phone ?? f.phone,
    }));
  }, [customer]);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
      if (isLoggedIn && token) await attachCustomerToCart(cartId, token);

      await setCartAddressAndEmail(
        cartId,
        form.email,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          address_1: form.address1,
          city: form.city,
          phone: form.phone,
          country_code: "lk",
        },
        { payment_method: payment }
      );

      // Options can depend on the address, so re-check now that it's set.
      const options = shippingOptions.length ? shippingOptions : await listShippingOptions(cartId);
      const optionId = shippingId ?? options[0]?.id;
      if (optionId) await addShippingMethod(cartId, optionId);

      await initiatePaymentSession(cartId, "pp_system_default");

      const result = await completeCart(cartId);
      if (result.type === "order" && result.order) {
        clearCart();
        router.push(`/checkout/confirmation?order=${result.order.display_id}&pay=${payment}`);
      } else {
        setError("We couldn’t place your order. Please try again.");
      }
    } catch {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cartLoaded) {
    return (
      <div className="min-h-[70vh] pt-28">
        <SunsetLoader />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-16 text-center">
        <p className="tagline text-3xl">Your bag is as empty as a beach at dawn.</p>
        <Link href="/" className="btn btn-solid mt-8">
          <span>Start Exploring</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 pt-28 sm:px-8 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between">
          <h1 className="display text-[clamp(2.9rem,8vw,6.5rem)] uppercase">Checkout</h1>
          <Link href="/cart" className="link-draw caps text-[10px] text-muted">
            Back to Bag
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_380px] md:gap-16">
          <form onSubmit={handleSubmit} className="space-y-12">
            <section>
              <h2 className="caps mb-5 text-[12px] font-medium">1. Contact</h2>
              <Field label="Email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} />
            </section>

            <section>
              <h2 className="caps mb-5 text-[12px] font-medium">2. Delivery Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" required autoComplete="given-name" value={form.firstName} onChange={update("firstName")} />
                <Field label="Last name" required autoComplete="family-name" value={form.lastName} onChange={update("lastName")} />
                <Field label="Address" required autoComplete="street-address" value={form.address1} onChange={update("address1")} className="sm:col-span-2" />
                <Field label="City" required autoComplete="address-level2" value={form.city} onChange={update("city")} />
                <Field label="Phone" type="tel" required autoComplete="tel" value={form.phone} onChange={update("phone")} />
              </div>
            </section>

            <section>
              <h2 className="caps mb-5 text-[12px] font-medium">3. Delivery</h2>
              {shippingOptions.length > 0 ? (
                <div className="space-y-3">
                  {shippingOptions.map((o) => (
                    <Choice
                      key={o.id}
                      name="shipping"
                      checked={shippingId === o.id}
                      onSelect={() => setShippingId(o.id)}
                      title={o.name}
                      aside={o.amount ? formatPrice(o.amount) : "Free"}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-ink-soft">
                  We deliver island-wide. Delivery charges are added once your address is confirmed.
                </p>
              )}
            </section>

            <section>
              <h2 className="caps mb-5 text-[12px] font-medium">4. Payment</h2>
              <div className="space-y-3">
                {paymentMethods.map((m) => (
                  <Choice
                    key={m.id}
                    name="payment"
                    checked={payment === m.id}
                    disabled={!m.available}
                    onSelect={() => setPayment(m.id)}
                    title={m.label}
                    note={m.note}
                  />
                ))}
              </div>
            </section>

            {error && (
              <p role="alert" className="text-[14px] text-terracotta">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn btn-solid w-full">
              <span>{submitting ? "Placing Order…" : "Place Order"}</span>
            </button>
          </form>

          <aside className="md:sticky md:top-24 md:self-start">
            <div className="border border-line bg-sand p-6 sm:p-8">
              <h2 className="caps text-[13px] font-medium">Order Summary</h2>
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-sand-deep">
                      {item.image && <Image src={item.image} alt={item.imageAlt} fill sizes="64px" className="object-cover" />}
                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-paper">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 text-[13px]">
                      <p className="truncate">{item.productName}</p>
                      <p className="text-muted">{[item.color, item.size].filter(Boolean).join(", ")}</p>
                    </div>
                    <p className="whitespace-nowrap text-[13px]">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[14px]">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Delivery</dt>
                  <dd>{deliveryAmount === null ? "Calculated at checkout" : deliveryAmount ? formatPrice(deliveryAmount) : "Free"}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-4 text-[15px] font-medium">
                  <dt>Total</dt>
                  <dd>{formatPrice(total + (deliveryAmount ?? 0))}</dd>
                </div>
              </dl>
              <p className="tagline mt-5 text-center text-[16px] text-ink-soft">
                Every piece is handcrafted in Sri Lanka by local artisans.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
