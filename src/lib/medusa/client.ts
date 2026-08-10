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
  token?: string;
}

// Render's free tier spins the backend down after idle periods; a cold
// start can take 30-60s, which is longer than Netlify's function timeout.
// Bail out well before that so the function fails fast instead of hanging
// until Netlify kills it. Cart mutations legitimately take up to ~9-10s
// (Medusa recalculates pricing/tax/promotions on every write), so the
// timeout needs real headroom above that or it kills valid slow requests.
const MEDUSA_TIMEOUT_MS = 20_000;

async function medusaFetch<T>(
  path: string,
  { method = "GET", params = {}, body, token }: MedusaFetchOptions = {}
): Promise<T> {
  const url = new URL(path, BACKEND_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), MEDUSA_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: {
        "x-publishable-api-key": PUBLISHABLE_KEY!,
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      ...(method === "GET" ? { next: { revalidate: 60 } } : { cache: "no-store" }),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Medusa request timed out after ${MEDUSA_TIMEOUT_MS}ms: ${url.pathname}`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

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

export async function attachCustomerToCart(
  cartId: string,
  token: string
): Promise<void> {
  await medusaFetch(`/store/carts/${cartId}/customer`, {
    method: "POST",
    token,
  });
}

// ── Customer accounts ────────────────────────────────────────────

export interface MedusaCustomerAddress {
  id: string;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  city: string | null;
  phone: string | null;
  country_code: string | null;
  is_default_shipping: boolean;
}

export interface MedusaCustomer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  addresses: MedusaCustomerAddress[];
}

export interface MedusaOrder {
  id: string;
  display_id: number;
  status: string;
  payment_status: string;
  fulfillment_status: string;
  total: number;
  currency_code: string;
  created_at: string;
  email: string;
  shipping_address: MedusaAddress | null;
  items: {
    id: string;
    title: string;
    thumbnail: string | null;
    variant_title: string | null;
    unit_price: number;
    quantity: number;
  }[];
}

// Registering a customer is a 3-step Medusa flow: register the auth identity,
// use that (single-use) token to create the customer record, then log in for
// a real session token — the registration token stops working the moment the
// customer record exists.
export async function registerCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ token: string; customer: MedusaCustomer }> {
  const { token: registrationToken } = await medusaFetch<{ token: string }>(
    "/auth/customer/emailpass/register",
    { method: "POST", body: { email, password } }
  );

  await medusaFetch<{ customer: MedusaCustomer }>("/store/customers", {
    method: "POST",
    token: registrationToken,
    body: { email, first_name: firstName, last_name: lastName },
  });

  return loginCustomer(email, password);
}

export async function loginCustomer(
  email: string,
  password: string
): Promise<{ token: string; customer: MedusaCustomer }> {
  const { token } = await medusaFetch<{ token: string }>(
    "/auth/customer/emailpass",
    { method: "POST", body: { email, password } }
  );
  const customer = await getCustomer(token);
  return { token, customer };
}

export async function getCustomer(token: string): Promise<MedusaCustomer> {
  const data = await medusaFetch<{ customer: MedusaCustomer }>(
    "/store/customers/me",
    { token }
  );
  return data.customer;
}

export async function updateCustomer(
  token: string,
  update: { first_name?: string; last_name?: string; phone?: string }
): Promise<MedusaCustomer> {
  const data = await medusaFetch<{ customer: MedusaCustomer }>(
    "/store/customers/me",
    { method: "POST", token, body: update }
  );
  return data.customer;
}

export async function addAddress(
  token: string,
  address: MedusaAddress & { is_default_shipping?: boolean }
): Promise<MedusaCustomer> {
  const data = await medusaFetch<{ customer: MedusaCustomer }>(
    "/store/customers/me/addresses",
    { method: "POST", token, body: address }
  );
  return data.customer;
}

export async function updateAddress(
  token: string,
  addressId: string,
  address: Partial<MedusaAddress>
): Promise<MedusaCustomer> {
  const data = await medusaFetch<{ customer: MedusaCustomer }>(
    `/store/customers/me/addresses/${addressId}`,
    { method: "POST", token, body: address }
  );
  return data.customer;
}

export async function deleteAddress(
  token: string,
  addressId: string
): Promise<void> {
  await medusaFetch(`/store/customers/me/addresses/${addressId}`, {
    method: "DELETE",
    token,
  });
}

const ORDER_FIELDS =
  "id,display_id,status,payment_status,fulfillment_status,total,currency_code,created_at,email,*shipping_address,*items";

export async function listOrders(token: string): Promise<MedusaOrder[]> {
  const data = await medusaFetch<{ orders: MedusaOrder[] }>("/store/orders", {
    token,
    params: { fields: ORDER_FIELDS, order: "-created_at" },
  });
  return data.orders;
}

export async function getOrder(
  token: string,
  orderId: string
): Promise<MedusaOrder> {
  const data = await medusaFetch<{ order: MedusaOrder }>(
    `/store/orders/${orderId}`,
    { token, params: { fields: ORDER_FIELDS } }
  );
  return data.order;
}
