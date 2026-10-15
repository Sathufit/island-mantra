// Prices display as "12,500 LKR", per the customer's layout guide.
export function formatPrice(amount: number): string {
  const value = new Intl.NumberFormat("en-LK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${value} LKR`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
