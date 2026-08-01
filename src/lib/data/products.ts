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
}

export const products: Product[] = [
  // ── Linen Edit ──────────────────────────────────────────────
  {
    id: "1",
    slug: "hikka-breeze-linen-shirt",
    name: "Hikka Breeze Linen Shirt",
    collectionSlug: "linen-edit",
    collectionName: "Linen Edit",
    price: 7990,
    images: [
      {
        src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
        alt: "Hikka Breeze Linen Shirt — front",
      },
      {
        src: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80",
        alt: "Hikka Breeze Linen Shirt — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
        alt: "Hikka Breeze Linen Shirt — styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Natural", colorHex: "#D4C5A9" },
      { color: "Ocean", colorHex: "#0E4F52" },
      { color: "Sand", colorHex: "#F4EDE1" },
    ],
    description:
      "Cut from 100% European linen, the Hikka Breeze shirt is your go-to for effortless coastal dressing. A relaxed fit with a classic collar, wooden buttons, and a slightly longer back hem. Wears beautifully both open over a swimsuit or buttoned for dinner.",
    fabric: "100% European linen. Woven in Sri Lanka.",
    care: "Machine wash cold, gentle cycle. Tumble dry low or lay flat. Iron on medium while slightly damp.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    isBestSeller: true,
    relatedSlugs: ["weligama-linen-pants", "galle-linen-set"],
    tags: ["linen", "shirt", "men", "women", "new"],
  },
  {
    id: "2",
    slug: "weligama-linen-pants",
    name: "Weligama Linen Pants",
    collectionSlug: "linen-edit",
    collectionName: "Linen Edit",
    price: 8990,
    images: [
      {
        src: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b50?w=800&q=80",
        alt: "Weligama Linen Pants — front",
      },
      {
        src: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80",
        alt: "Weligama Linen Pants — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80",
        alt: "Weligama Linen Pants — styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Natural", colorHex: "#D4C5A9" },
      { color: "Ivory", colorHex: "#F5F0E8" },
      { color: "Ink", colorHex: "#1F2A2B" },
    ],
    description:
      "Wide-leg linen trousers with an elasticated waist and deep side pockets. The Weligama Pants drape beautifully and keep you cool through even the hottest Sri Lankan afternoons. Pair with the Hikka Breeze Shirt for a complete linen look.",
    fabric: "100% linen. Garment washed for softness.",
    care: "Hand wash or machine wash cold. Do not bleach. Hang dry.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isBestSeller: true,
    relatedSlugs: ["hikka-breeze-linen-shirt", "galle-linen-set"],
    tags: ["linen", "pants", "women", "bestseller"],
  },
  {
    id: "3",
    slug: "galle-linen-set",
    name: "Galle Linen Co-ord Set",
    collectionSlug: "linen-edit",
    collectionName: "Linen Edit",
    price: 12500,
    compareAtPrice: 15000,
    images: [
      {
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
        alt: "Galle Linen Co-ord Set — front",
      },
      {
        src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        alt: "Galle Linen Co-ord Set — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
        alt: "Galle Linen Co-ord Set — styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Sage", colorHex: "#8FAF8A" },
      { color: "Sand", colorHex: "#F4EDE1" },
    ],
    description:
      "A matching linen shirt and wide-leg trouser set. The Galle Co-ord is the ultimate in effortless island dressing — wear together for a polished look or mix and match with other wardrobe staples.",
    fabric: "100% stonewashed linen.",
    care: "Machine wash cold. Tumble dry low. Iron lightly if needed.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    relatedSlugs: ["hikka-breeze-linen-shirt", "weligama-linen-pants"],
    tags: ["linen", "set", "co-ord", "women", "new", "sale"],
  },
  {
    id: "4",
    slug: "unawatuna-linen-overshirt",
    name: "Unawatuna Linen Overshirt",
    collectionSlug: "linen-edit",
    collectionName: "Linen Edit",
    price: 6990,
    images: [
      {
        src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
        alt: "Unawatuna Linen Overshirt — front",
      },
      {
        src: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80",
        alt: "Unawatuna Linen Overshirt — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80",
        alt: "Unawatuna Linen Overshirt — worn open",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "White", colorHex: "#FFFFFF" },
      { color: "Terracotta", colorHex: "#C4714B" },
    ],
    description:
      "A longline linen overshirt designed to be worn open over a bikini or belted as a midi dress. Oversized, breezy, endlessly versatile. The Unawatuna Overshirt is the piece you'll grab every single beach day.",
    fabric: "100% linen, medium weight.",
    care: "Machine wash cold. Hang dry in shade.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    relatedSlugs: ["hikka-breeze-linen-shirt", "galle-linen-set"],
    tags: ["linen", "overshirt", "women"],
  },

  // ── Coastal Dresses ──────────────────────────────────────────
  {
    id: "5",
    slug: "coral-bay-maxi-dress",
    name: "Coral Bay Maxi Dress",
    collectionSlug: "coastal-dresses",
    collectionName: "Coastal Dresses",
    price: 9990,
    images: [
      {
        src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
        alt: "Coral Bay Maxi Dress — full length",
      },
      {
        src: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
        alt: "Coral Bay Maxi Dress — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "Coral Bay Maxi Dress — beach",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Coral", colorHex: "#E1704B" },
      { color: "Ivory", colorHex: "#F5F0E8" },
      { color: "Lagoon", colorHex: "#2E7D7B" },
    ],
    description:
      "A sweeping maxi dress with a deep V-neck, adjustable tie waist, and a split that catches the breeze as you walk. The Coral Bay is your all-day dress — cool enough for the beach, elegant enough for a sunset dinner in Galle.",
    fabric: "100% viscose crepe.",
    care: "Hand wash cold. Lay flat to dry. Do not wring.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    isBestSeller: true,
    relatedSlugs: ["mirissa-wrap-dress", "tangalle-slip-dress"],
    tags: ["dress", "maxi", "women", "bestseller", "new"],
  },
  {
    id: "6",
    slug: "mirissa-wrap-dress",
    name: "Mirissa Wrap Dress",
    collectionSlug: "coastal-dresses",
    collectionName: "Coastal Dresses",
    price: 8500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&q=80",
        alt: "Mirissa Wrap Dress — front",
      },
      {
        src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
        alt: "Mirissa Wrap Dress — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "Mirissa Wrap Dress — styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Hibiscus", colorHex: "#C84B6E" },
      { color: "Sage", colorHex: "#8FAF8A" },
      { color: "Natural", colorHex: "#D4C5A9" },
    ],
    description:
      "The classic wrap silhouette, elevated for the tropics. A midi length with a flared hem and adjustable tie that cinches effortlessly at the waist. The Mirissa Wrap flatters every body and moves beautifully in the ocean breeze.",
    fabric: "100% TENCEL™ lyocell.",
    care: "Machine wash on gentle cycle. Hang dry.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isBestSeller: true,
    relatedSlugs: ["coral-bay-maxi-dress", "tangalle-slip-dress"],
    tags: ["dress", "wrap", "midi", "women", "bestseller"],
  },
  {
    id: "7",
    slug: "tangalle-slip-dress",
    name: "Tangalle Slip Dress",
    collectionSlug: "coastal-dresses",
    collectionName: "Coastal Dresses",
    price: 6500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
        alt: "Tangalle Slip Dress — front",
      },
      {
        src: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&q=80",
        alt: "Tangalle Slip Dress — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
        alt: "Tangalle Slip Dress — beach styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Champagne", colorHex: "#F0E0C0" },
      { color: "Ink", colorHex: "#1F2A2B" },
    ],
    description:
      "Satin-finish slip dress with adjustable straps and a bias-cut hem. Wear alone on the beach or layered under the Unawatuna Overshirt for an evening in town. Minimal, versatile, and quietly luxurious.",
    fabric: "100% recycled polyester satin.",
    care: "Hand wash cold. Do not tumble dry.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    relatedSlugs: ["coral-bay-maxi-dress", "mirissa-wrap-dress"],
    tags: ["dress", "slip", "women", "new"],
  },
  {
    id: "8",
    slug: "arugam-kaftan-dress",
    name: "Arugam Kaftan Dress",
    collectionSlug: "coastal-dresses",
    collectionName: "Coastal Dresses",
    price: 10500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "Arugam Kaftan Dress — full view",
      },
      {
        src: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
        alt: "Arugam Kaftan Dress — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
        alt: "Arugam Kaftan Dress — styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Spice", colorHex: "#B5651D" },
      { color: "Ocean", colorHex: "#0E4F52" },
      { color: "White", colorHex: "#FFFFFF" },
    ],
    description:
      "A generous, flowing kaftan with hand-block print detailing at the neckline. Inspired by the laid-back spirit of Arugam Bay, this dress is equally at home on the beach, at a yoga retreat, or at a boutique hotel brunch.",
    fabric: "100% cotton muslin, hand-printed.",
    care: "Machine wash cold, gentle. Hang dry. Iron inside out.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    relatedSlugs: ["coral-bay-maxi-dress", "mirissa-wrap-dress"],
    tags: ["dress", "kaftan", "women", "print"],
  },

  // ── Island Tees ──────────────────────────────────────────────
  {
    id: "9",
    slug: "south-coast-pocket-tee",
    name: "South Coast Pocket Tee",
    collectionSlug: "island-tees",
    collectionName: "Island Tees",
    price: 3500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        alt: "South Coast Pocket Tee — front",
      },
      {
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
        alt: "South Coast Pocket Tee — back",
      },
      {
        src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
        alt: "South Coast Pocket Tee — detail",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "White", colorHex: "#FFFFFF" },
      { color: "Ocean", colorHex: "#0E4F52" },
      { color: "Sand", colorHex: "#F4EDE1" },
      { color: "Ink", colorHex: "#1F2A2B" },
    ],
    description:
      "Our signature everyday tee. Crafted from heavyweight 220gsm organic cotton with a small embroidered logo at the chest pocket. A relaxed fit that doesn't crease, doesn't shrink, and only gets better with each wash.",
    fabric: "220gsm 100% organic cotton.",
    care: "Machine wash up to 40°C. Tumble dry low. Do not iron on print.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    isBestSeller: true,
    relatedSlugs: ["hikkaduwa-graphic-tee", "turtle-bay-oversized-tee"],
    tags: ["tee", "basics", "unisex", "new", "bestseller"],
  },
  {
    id: "10",
    slug: "hikkaduwa-graphic-tee",
    name: "Hikkaduwa Graphic Tee",
    collectionSlug: "island-tees",
    collectionName: "Island Tees",
    price: 4200,
    images: [
      {
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
        alt: "Hikkaduwa Graphic Tee — front",
      },
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        alt: "Hikkaduwa Graphic Tee — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
        alt: "Hikkaduwa Graphic Tee — styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Off-White", colorHex: "#F5F0E8" },
      { color: "Vintage Black", colorHex: "#2C2C2C" },
    ],
    description:
      "A hand-screen-printed graphic tee featuring an original Island Mantra illustration of the Hikkaduwa coastline. Printed on garment-washed cotton for a soft, vintage feel. Each tee is slightly unique — a wearable piece of art.",
    fabric: "180gsm 100% organic cotton, garment washed.",
    care: "Machine wash cold, inside out. Do not tumble dry. Lay flat.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isBestSeller: true,
    relatedSlugs: ["south-coast-pocket-tee", "turtle-bay-oversized-tee"],
    tags: ["tee", "graphic", "unisex", "bestseller"],
  },
  {
    id: "11",
    slug: "turtle-bay-oversized-tee",
    name: "Turtle Bay Oversized Tee",
    collectionSlug: "island-tees",
    collectionName: "Island Tees",
    price: 3800,
    images: [
      {
        src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
        alt: "Turtle Bay Oversized Tee — front",
      },
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        alt: "Turtle Bay Oversized Tee — side",
      },
      {
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
        alt: "Turtle Bay Oversized Tee — detail",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Sand", colorHex: "#F4EDE1" },
      { color: "Sage", colorHex: "#8FAF8A" },
      { color: "Lagoon", colorHex: "#2E7D7B" },
    ],
    description:
      "A boxy oversized silhouette with dropped shoulders and a slightly longer back. The Turtle Bay tee features a small sea turtle embroidery on the left sleeve — a nod to the beach nesting grounds near Hikkaduwa. Part of every purchase goes to the local turtle conservation project.",
    fabric: "200gsm 100% organic cotton.",
    care: "Machine wash cold. Tumble dry low.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    relatedSlugs: ["south-coast-pocket-tee", "hikkaduwa-graphic-tee"],
    tags: ["tee", "oversized", "unisex", "new", "eco"],
  },
  {
    id: "12",
    slug: "mantra-stripe-tee",
    name: "Mantra Stripe Tee",
    collectionSlug: "island-tees",
    collectionName: "Island Tees",
    price: 3990,
    images: [
      {
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
        alt: "Mantra Stripe Tee — front",
      },
      {
        src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
        alt: "Mantra Stripe Tee — detail",
      },
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        alt: "Mantra Stripe Tee — styled",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      { color: "Navy/White", colorHex: "#2E3F6F" },
      { color: "Coral/White", colorHex: "#E1704B" },
    ],
    description:
      "A classic Breton stripe tee reimagined for island life. Cut slightly boxy with a crew neck. Wear tucked into wide-leg linen trousers or loose over your favourite swimwear.",
    fabric: "100% organic cotton jersey.",
    care: "Machine wash warm. Tumble dry medium.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    relatedSlugs: ["south-coast-pocket-tee", "turtle-bay-oversized-tee"],
    tags: ["tee", "stripe", "unisex"],
  },

  // ── Accessories ──────────────────────────────────────────────
  {
    id: "13",
    slug: "hikka-palm-straw-hat",
    name: "Hikka Palm Straw Hat",
    collectionSlug: "accessories",
    collectionName: "Accessories",
    price: 4500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        alt: "Hikka Palm Straw Hat — front",
      },
      {
        src: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
        alt: "Hikka Palm Straw Hat — detail weave",
      },
      {
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
        alt: "Hikka Palm Straw Hat — worn on beach",
      },
    ],
    sizes: ["One Size"],
    variants: [
      { color: "Natural", colorHex: "#D4C5A9" },
      { color: "Black", colorHex: "#1F2A2B" },
    ],
    description:
      "Hand-woven from natural palm straw by artisans in Matara. A wide brim, an adjustable grosgrain inner band, and a packable shape — the Hikka Hat is built to travel. Every hat is unique; slight variations in weave are part of the handmade character.",
    fabric: "100% natural palm straw. Cotton grosgrain band.",
    care: "Spot clean with a damp cloth. Reshape while damp. Store in a dry place.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    isBestSeller: true,
    relatedSlugs: ["southside-woven-tote", "pandan-shell-bracelet"],
    tags: ["hat", "accessories", "unisex", "new", "bestseller", "handmade"],
  },
  {
    id: "14",
    slug: "southside-woven-tote",
    name: "Southside Woven Tote",
    collectionSlug: "accessories",
    collectionName: "Accessories",
    price: 5990,
    images: [
      {
        src: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
        alt: "Southside Woven Tote — front",
      },
      {
        src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        alt: "Southside Woven Tote — interior",
      },
      {
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
        alt: "Southside Woven Tote — beach styled",
      },
    ],
    sizes: ["One Size"],
    variants: [
      { color: "Natural/Coral", colorHex: "#D4C5A9" },
      { color: "Natural/Ocean", colorHex: "#0E4F52" },
    ],
    description:
      "A handwoven seagrass tote with leather handles and a cotton canvas lining. Large enough for a beach day — towel, sunscreen, book, all of it. The Southside Tote gets more beautiful with use, the weave softening over time.",
    fabric: "Natural seagrass exterior. Cotton canvas lining. Leather handles.",
    care: "Avoid prolonged exposure to water. Spot clean. Do not machine wash.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isBestSeller: true,
    relatedSlugs: ["hikka-palm-straw-hat", "pandan-shell-bracelet"],
    tags: ["bag", "tote", "accessories", "unisex", "bestseller", "handmade"],
  },
  {
    id: "15",
    slug: "pandan-shell-bracelet",
    name: "Pandan Shell Bracelet",
    collectionSlug: "accessories",
    collectionName: "Accessories",
    price: 2500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
        alt: "Pandan Shell Bracelet — close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        alt: "Pandan Shell Bracelet — worn",
      },
      {
        src: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
        alt: "Pandan Shell Bracelet — collection",
      },
    ],
    sizes: ["One Size"],
    variants: [
      { color: "White Shell", colorHex: "#F5F5F0" },
      { color: "Coral Shell", colorHex: "#E1704B" },
      { color: "Brown Shell", colorHex: "#8B6345" },
    ],
    description:
      "Hand-strung with ethically collected shells from Sri Lanka's southern coast, threaded on waxed cotton cord. Each bracelet is unique — a small, wearable piece of the island. Stacks beautifully with others from the Mantra accessories range.",
    fabric: "Natural shells. Waxed cotton cord. Brass toggle closure.",
    care: "Remove before swimming. Store in dry place away from direct sunlight.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    isNew: true,
    relatedSlugs: ["hikka-palm-straw-hat", "southside-woven-tote"],
    tags: ["bracelet", "jewellery", "accessories", "handmade", "new"],
  },
  {
    id: "16",
    slug: "ocean-road-sunglasses",
    name: "Ocean Road Sunglasses",
    collectionSlug: "accessories",
    collectionName: "Accessories",
    price: 6500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b50?w=800&q=80",
        alt: "Ocean Road Sunglasses — front",
      },
      {
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
        alt: "Ocean Road Sunglasses — side",
      },
      {
        src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        alt: "Ocean Road Sunglasses — detail",
      },
    ],
    sizes: ["One Size"],
    variants: [
      { color: "Tort/Green", colorHex: "#8B6914" },
      { color: "Black/Black", colorHex: "#1F2A2B" },
      { color: "Clear/Brown", colorHex: "#C4A882" },
    ],
    description:
      "Oversized square frames with polarised lenses and UV400 protection. Lightweight acetate construction. The Ocean Road Sunglasses are inspired by the long coast road from Colombo to Hikkaduwa — made for drives, beach days, and everything in between.",
    fabric: "Acetate frames. Polarised mineral glass lenses. UV400.",
    care: "Clean with the included microfibre cloth. Store in the provided case.",
    shipping:
      "Islandwide delivery in 2–4 business days. Free shipping on orders over Rs 5,000.",
    relatedSlugs: ["hikka-palm-straw-hat", "southside-woven-tote"],
    tags: ["sunglasses", "accessories", "unisex"],
  },
];
