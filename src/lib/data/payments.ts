export type PaymentMethodId = "card" | "cod" | "bank_transfer";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  note?: string;
  /** Card payments need PayHere merchant credentials on the backend first. */
  available: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    label: "Card payment",
    note: "Secure card payments are coming soon.",
    available: false,
  },
  {
    id: "cod",
    label: "Cash on delivery",
    note: "Pay in cash when your order arrives.",
    available: true,
  },
  {
    id: "bank_transfer",
    label: "Bank transfer",
    note: "Our bank account details will be sent with your order confirmation. Your order will be dispatched once payment is received.",
    available: true,
  },
];
