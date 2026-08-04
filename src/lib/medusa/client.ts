const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

if (!BACKEND_URL || !PUBLISHABLE_KEY) {
  throw new Error(
    "Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL or NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY. Copy .env.local.example to .env.local and fill them in."
  );
}

interface MedusaFetchOptions {
  method?: "GET" | "POST" | "DELETE";
  params?: Record<string, string>;
  body?: unknown;
}

async function medusaFetch<T>(
  path: string,
  { method = "GET", params = {}, body }: MedusaFetchOptions = {}
): Promise<T> {
  const url = new URL(path, BACKEND_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, {
    method,
    headers: {
      "x-publishable-api-key": PUBLISHABLE_KEY!,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(method === "GET" ? { next: { revalidate: 60 } } : { cache: "no-store" }),
  });

  if (!res.ok) {
    throw new Error(`Medusa request failed (${res.status}): ${url.pathname}`);
  }

  return res.json() as Promise<T>;
}

let regionIdPromise: Promise<string> | null = null;

// The store only ever has one region (Sri Lanka / LKR), so its id is
// resolved once per server instance and reused for every priced request.
export function getRegionId(): Promise<string> {
  if (!regionIdPromise) {
    regionIdPromise = medusaFetch<{ regions: { id: string }[] }>(
      "/store/regions"
    ).then((data) => data.regions[0].id);
  }
  return regionIdPromise;
}

const PRODUCT_FIELDS =
  "*variants.calculated_price,*variants.options,*variants.metadata,*images,*options,*categories,*collection,+metadata,+material";

export async function fetchProducts(): Promise<MedusaProduct[]> {
  const region_id = await getRegionId();
  const data = await medusaFetch<{ products: MedusaProduct[] }>(
    "/store/products",
    { params: { region_id, fields: PRODUCT_FIELDS, limit: "100" } }
  );
  return data.products;
}

export interface MedusaOptionValue {
  value: string;
}

export interface MedusaProductOption {
  title: string;
  values: MedusaOptionValue[];
}

export interface MedusaVariant {
  id: string;
  title: string;
  sku: string | null;
  metadata: Record<string, unknown> | null;
  options: { value: string; option: { title: string } }[];
  calculated_price: { calculated_amount: number; original_amount: number } | null;
}

export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  material: string | null;
  metadata: Record<string, unknown> | null;
  images: { url: string }[];
  options: MedusaProductOption[];
  variants: MedusaVariant[];
  categories: { handle: string }[] | null;
  collection: { title: string; handle: string } | null;
}

// ── Cart / checkout ─────────────────────────────────────────────

export interface MedusaAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  phone: string;
  country_code: "lk";
}

export interface MedusaLineItem {
  id: string;
  product_handle: string;
  product_title: string;
  variant_title: string;
  thumbnail: string | null;
  unit_price: number;
  quantity: number;
}

export interface MedusaShippingMethod {
  id: string;
  shipping_option_id: string;
  amount: number;
}

export interface MedusaCart {
  id: string;
  email: string | null;
  items: MedusaLineItem[];
  shipping_methods: MedusaShippingMethod[];
  subtotal: number;
  shipping_total: number;
  total: number;
}

export interface MedusaShippingOption {
  id: string;
  name: string;
  amount: number | null;
}

const CART_FIELDS =
  "*items,*shipping_methods,+subtotal,+shipping_total,+total";

export async function createCart(): Promise<MedusaCart> {
  const region_id = await getRegionId();
  const data = await medusaFetch<{ cart: MedusaCart }>("/store/carts", {
    method: "POST",
    body: { region_id },
  });
  return data.cart;
}

export async function getCart(cartId: string): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/store/carts/${cartId}`,
    { params: { fields: CART_FIELDS } }
  );
  return data.cart;
}

export async function addLineItem(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/line-items`,
    { method: "POST", body: { variant_id: variantId, quantity } }
  );
  return data.cart;
}

export async function updateLineItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/line-items/${lineItemId}`,
    { method: "POST", body: { quantity } }
  );
  return data.cart;
}

export async function removeLineItem(
  cartId: string,
  lineItemId: string
): Promise<void> {
  await medusaFetch(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "DELETE",
  });
}

export async function setCartAddressAndEmail(
  cartId: string,
  email: string,
  address: MedusaAddress
): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/store/carts/${cartId}`,
    { method: "POST", body: { email, shipping_address: address } }
  );
  return data.cart;
}

export async function listShippingOptions(
  cartId: string
): Promise<MedusaShippingOption[]> {
  const data = await medusaFetch<{ shipping_options: MedusaShippingOption[] }>(
    "/store/shipping-options",
    { params: { cart_id: cartId } }
  );
  return data.shipping_options;
}

export async function addShippingMethod(
  cartId: string,
  optionId: string
): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/shipping-methods`,
    { method: "POST", body: { option_id: optionId } }
  );
  return data.cart;
}

export async function initiatePaymentSession(
  cartId: string,
  providerId: string
): Promise<void> {
  const { payment_collection } = await medusaFetch<{
    payment_collection: { id: string };
  }>("/store/payment-collections", { method: "POST", body: { cart_id: cartId } });

  await medusaFetch(
    `/store/payment-collections/${payment_collection.id}/payment-sessions`,
    { method: "POST", body: { provider_id: providerId } }
  );
}

export async function completeCart(
  cartId: string
): Promise<{ type: "order" | "cart"; order?: { id: string; display_id: number } }> {
  return medusaFetch(`/store/carts/${cartId}/complete`, { method: "POST" });
}
