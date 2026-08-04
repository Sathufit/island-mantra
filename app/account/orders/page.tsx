"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/src/store/customer";
import { listOrders, type MedusaOrder } from "@/src/lib/medusa/client";
import { formatPrice } from "@/src/lib/utils";

export default function OrderHistoryPage() {
  const router = useRouter();
  const { token, hasHydrated } = useCustomer();
  const [orders, setOrders] = useState<MedusaOrder[] | null>(null);

  useEffect(() => {
    // Wait for zustand's localStorage rehydration before deciding whether to
    // redirect — `token` is null until then even for a logged-in visitor.
    if (!hasHydrated) return;
    if (!token) {
      router.replace("/account");
      return;
    }
    listOrders(token).then(setOrders);
  }, [hasHydrated, token, router]);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl text-[#0A0A0A]">Order History</h1>
          <Link
            href="/account"
            className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
          >
            Back to Account
          </Link>
        </div>

        {orders === null ? (
          <p className="font-sans text-sm text-[#0A0A0A]/50">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="font-sans text-sm text-[#0A0A0A]/60">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="divide-y divide-[#E7DCC8]">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between py-5 hover:bg-[#F4EDE1] transition-colors px-2 -mx-2"
              >
                <div>
                  <p className="font-serif text-base text-[#0A0A0A]">
                    Order #{order.display_id}
                  </p>
                  <p className="font-sans text-xs text-[#0A0A0A]/50 mt-1">
                    {new Date(order.created_at).toLocaleDateString("en-LK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · {order.fulfillment_status.replace(/_/g, " ")}
                  </p>
                </div>
                <p className="font-sans text-sm text-[#0A0A0A]">
                  {formatPrice(order.total)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
