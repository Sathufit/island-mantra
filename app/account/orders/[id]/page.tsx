"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/src/store/customer";
import { getOrder, type MedusaOrder } from "@/src/lib/medusa/client";
import { formatPrice } from "@/src/lib/utils";
import SunsetLoader from "@/src/components/ui/SunsetLoader";

const STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "authorized", label: "Payment Confirmed" },
  { key: "fulfilled", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const;

function currentStepIndex(order: MedusaOrder): number {
  if (order.fulfillment_status === "delivered") return 4;
  if (order.fulfillment_status === "shipped") return 3;
  if (order.fulfillment_status === "fulfilled") return 2;
  if (order.payment_status === "authorized" || order.payment_status === "captured")
    return 1;
  return 0;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { token, hasHydrated } = useCustomer();
  const [order, setOrder] = useState<MedusaOrder | null>(null);

  useEffect(() => {
    // See app/account/orders/page.tsx — wait for persisted-state rehydration
    // before redirecting a visitor who's actually still logged in.
    if (!hasHydrated) return;
    if (!token) {
      router.replace("/account");
      return;
    }
    getOrder(token, id).then(setOrder);
  }, [hasHydrated, token, id, router]);

  if (!order) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <SunsetLoader />
      </div>
    );
  }

  const step = currentStepIndex(order);
  const address = order.shipping_address;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="tagline text-4xl text-ink">
            Order #{order.display_id}
          </h1>
          <Link
            href="/account/orders"
            className="font-sans text-xs caps text-ink/60 hover:text-ink transition-colors"
          >
            Back to Orders
          </Link>
        </div>

        {/* Status timeline */}
        <div className="flex mb-12">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex-1 text-center">
              <div
                className={`h-1 mb-2 ${
                  i <= step ? "bg-ink" : "bg-line"
                }`}
              />
              <p
                className={`font-sans text-[10px] caps ${
                  i <= step ? "text-ink" : "text-ink/40"
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-line pb-4"
              >
                <div>
                  <p className="font-serif text-sm text-ink">
                    {item.title}
                  </p>
                  <p className="font-sans text-xs text-ink/50 mt-1">
                    {item.variant_title} × {item.quantity}
                  </p>
                </div>
                <p className="font-sans text-sm text-ink">
                  {formatPrice(item.unit_price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="flex justify-between pt-2 font-medium">
              <span className="font-sans text-sm text-ink">Total</span>
              <span className="font-serif text-lg text-ink">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          <div className="bg-sand p-6 h-fit">
            <h2 className="font-sans text-xs caps text-ink mb-3">
              Shipping Address
            </h2>
            {address ? (
              <p className="font-sans text-sm text-ink/80 leading-relaxed">
                {address.first_name} {address.last_name}
                <br />
                {address.address_1}
                <br />
                {address.city}
                <br />
                {address.phone}
              </p>
            ) : (
              <p className="font-sans text-sm text-ink/50">—</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
