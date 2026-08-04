export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  color: string;
  colorHex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collectionSlug: string;
  collectionName: string;
  category: "women" | "men" | "kids" | "accessories";
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  sizes: string[];
  variants: ProductVariant[];
  description: string;
  fabric: string;
  care: string;
  shipping: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  relatedSlugs: string[];
  tags: string[];
  /** "${size}|${color}" -> Medusa variant id, for adding the right variant to cart. */
  variantMap: Record<string, string>;
}
