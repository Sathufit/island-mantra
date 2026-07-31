export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  })
    .format(amount)
    .replace("LKR", "Rs");
}

export function formatBNPL(amount: number): { mintpay: string; koko: string } {
  const installment = Math.ceil(amount / 3);
  return {
    mintpay: formatPrice(installment),
    koko: formatPrice(installment),
  };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
