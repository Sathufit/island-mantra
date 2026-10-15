import type { Product } from "@/src/lib/data/products";
import type { CartItem } from "@/src/store/cart";
import type { MedusaCart, MedusaProduct } from "./client";

const SHIPPING_NOTE =
  "We deliver island-wide, to every part of Sri Lanka — delivery time and charges are shown at checkout. Prefer to collect? Choose store pickup at checkout. Returns and exchanges are accepted within 7 days of delivery.";

function getOptionValues(product: MedusaProduct, title: string): string[] {
  return (
    product.options.find((o) => o.title === title)?.values.map((v) => v.value) ??
    []
  );
}

function getColorHex(product: MedusaProduct, color: string): string {
  const variant = product.variants.find((v) =>
    v.options.some((o) => o.option.title === "Color" && o.value === color)
  );
  const hex = variant?.metadata?.color_hex;
  return typeof hex === "string" ? hex : "#1f1b16";
}

function getVariantMap(product: MedusaProduct): Record<string, string> {
  const map: Record<string, string> = {};
  for (const variant of product.variants) {
    const size = variant.options.find((o) => o.option.title === "Size")?.value;
    const color = variant.options.find((o) => o.option.title === "Color")?.value;
    if (size && color) {
      map[`${size}|${color}`] = variant.id;
    }
  }
  return map;
}

export function mapProduct(
  product: MedusaProduct,
  relatedSlugs: string[] = []
): Product {
  const metadata = product.metadata ?? {};
  const colors = getOptionValues(product, "Color");
  const price = product.variants[0]?.calculated_price?.calculated_amount ?? 0;

  return {
    id: product.id,
    slug: product.handle,
    name: product.title,
    collectionSlug: product.collection?.handle ?? "",
    collectionName: product.collection?.title ?? "",
    category: (product.categories?.[0]?.handle ?? "accessories") as Product["category"],
    price,
    images: product.images.map((img) => ({ src: img.url, alt: product.title })),
    sizes: getOptionValues(product, "Size"),
    variants: colors.map((color) => ({
      color,
      colorHex: getColorHex(product, color),
    })),
    description: product.description ?? "",
    fabric: product.material ?? "",
    care: typeof metadata.care === "string" ? metadata.care : "",
    shipping: SHIPPING_NOTE,
    isNew: Boolean(metadata.is_new),
    isBestSeller: Boolean(metadata.is_best_seller),
    relatedSlugs,
    tags: typeof metadata.tags === "string" ? metadata.tags.split(",") : [],
    variantMap: getVariantMap(product),
  };
}

export function mapCart(cart: MedusaCart): CartItem[] {
  return cart.items.map((item) => {
    const [size, color] = item.variant_title.split(" / ");
    return {
      id: item.id,
      variantId: item.variant_id,
      productSlug: item.product_handle,
      productName: item.product_title,
      price: item.unit_price,
      image: item.thumbnail ?? "",
      imageAlt: item.product_title,
      size: size ?? item.variant_title,
      color: color ?? "",
      quantity: item.quantity,
    };
  });
}
