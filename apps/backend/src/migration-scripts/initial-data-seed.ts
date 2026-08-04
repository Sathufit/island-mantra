import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"

type CategorySlug = "women" | "men" | "kids" | "accessories"

interface SeedColor {
  name: string
  hex: string
}

interface SeedProduct {
  handle: string
  title: string
  category: CategorySlug
  collection: string
  price: number
  images: string[]
  sizes: string[]
  colors: SeedColor[]
  description: string
  material: string
  care: string
  isNew?: boolean
  isBestSeller?: boolean
  tags: string[]
}

const CATEGORY_NAMES: Record<CategorySlug, string> = {
  women: "Women",
  men: "Men",
  kids: "Kids",
  accessories: "Accessories",
}

// Migrated from island-mantra/src/lib/data/products.ts so the storefront's
// existing slugs/categories/collections line up 1:1 with the Store API.
const products: SeedProduct[] = [
  {
    handle: "hikka-breeze-linen-shirt",
    title: "Hikka Breeze Linen Shirt",
    category: "men",
    collection: "Linen Edit",
    price: 7990,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Natural", hex: "#D4C5A9" },
      { name: "Ocean", hex: "#0E4F52" },
      { name: "Sand", hex: "#F4EDE1" },
    ],
    description:
      "Cut from 100% European linen, the Hikka Breeze shirt is your go-to for effortless coastal dressing. A relaxed fit with a classic collar, wooden buttons, and a slightly longer back hem. Wears beautifully both open over a swimsuit or buttoned for dinner.",
    material: "100% European linen. Woven in Sri Lanka.",
    care: "Machine wash cold, gentle cycle. Tumble dry low or lay flat. Iron on medium while slightly damp.",
    isNew: true,
    isBestSeller: true,
    tags: ["linen", "shirt", "men", "women", "new"],
  },
  {
    handle: "weligama-linen-pants",
    title: "Weligama Linen Pants",
    category: "women",
    collection: "Linen Edit",
    price: 8990,
    images: [
      "https://images.unsplash.com/photo-1715233749622-3216fe49e682?w=800&q=80",
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Natural", hex: "#D4C5A9" },
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Ink", hex: "#1F2A2B" },
    ],
    description:
      "Wide-leg linen trousers with an elasticated waist and deep side pockets. The Weligama Pants drape beautifully and keep you cool through even the hottest Sri Lankan afternoons. Pair with the Hikka Breeze Shirt for a complete linen look.",
    material: "100% linen. Garment washed for softness.",
    care: "Hand wash or machine wash cold. Do not bleach. Hang dry.",
    isBestSeller: true,
    tags: ["linen", "pants", "women", "bestseller"],
  },
  {
    handle: "galle-linen-set",
    title: "Galle Linen Co-ord Set",
    category: "women",
    collection: "Linen Edit",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sage", hex: "#8FAF8A" },
      { name: "Sand", hex: "#F4EDE1" },
    ],
    description:
      "A matching linen shirt and wide-leg trouser set. The Galle Co-ord is the ultimate in effortless island dressing — wear together for a polished look or mix and match with other wardrobe staples.",
    material: "100% stonewashed linen.",
    care: "Machine wash cold. Tumble dry low. Iron lightly if needed.",
    isNew: true,
    tags: ["linen", "set", "co-ord", "women", "new", "sale"],
  },
  {
    handle: "unawatuna-linen-overshirt",
    title: "Unawatuna Linen Overshirt",
    category: "women",
    collection: "Linen Edit",
    price: 6990,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Terracotta", hex: "#C4714B" },
    ],
    description:
      "A longline linen overshirt designed to be worn open over a bikini or belted as a midi dress. Oversized, breezy, endlessly versatile. The Unawatuna Overshirt is the piece you'll grab every single beach day.",
    material: "100% linen, medium weight.",
    care: "Machine wash cold. Hang dry in shade.",
    tags: ["linen", "overshirt", "women"],
  },
  {
    handle: "coral-bay-maxi-dress",
    title: "Coral Bay Maxi Dress",
    category: "women",
    collection: "Coastal Dresses",
    price: 9990,
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Coral", hex: "#E1704B" },
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Lagoon", hex: "#2E7D7B" },
    ],
    description:
      "A sweeping maxi dress with a deep V-neck, adjustable tie waist, and a split that catches the breeze as you walk. The Coral Bay is your all-day dress — cool enough for the beach, elegant enough for a sunset dinner in Galle.",
    material: "100% viscose crepe.",
    care: "Hand wash cold. Lay flat to dry. Do not wring.",
    isNew: true,
    isBestSeller: true,
    tags: ["dress", "maxi", "women", "bestseller", "new"],
  },
  {
    handle: "mirissa-wrap-dress",
    title: "Mirissa Wrap Dress",
    category: "women",
    collection: "Coastal Dresses",
    price: 8500,
    images: [
      "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Hibiscus", hex: "#C84B6E" },
      { name: "Sage", hex: "#8FAF8A" },
      { name: "Natural", hex: "#D4C5A9" },
    ],
    description:
      "The classic wrap silhouette, elevated for the tropics. A midi length with a flared hem and adjustable tie that cinches effortlessly at the waist. The Mirissa Wrap flatters every body and moves beautifully in the ocean breeze.",
    material: "100% TENCEL lyocell.",
    care: "Machine wash on gentle cycle. Hang dry.",
    isBestSeller: true,
    tags: ["dress", "wrap", "midi", "women", "bestseller"],
  },
  {
    handle: "tangalle-slip-dress",
    title: "Tangalle Slip Dress",
    category: "women",
    collection: "Coastal Dresses",
    price: 6500,
    images: [
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
      "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#F0E0C0" },
      { name: "Ink", hex: "#1F2A2B" },
    ],
    description:
      "Satin-finish slip dress with adjustable straps and a bias-cut hem. Wear alone on the beach or layered under the Unawatuna Overshirt for an evening in town. Minimal, versatile, and quietly luxurious.",
    material: "100% recycled polyester satin.",
    care: "Hand wash cold. Do not tumble dry.",
    isNew: true,
    tags: ["dress", "slip", "women", "new"],
  },
  {
    handle: "arugam-kaftan-dress",
    title: "Arugam Kaftan Dress",
    category: "women",
    collection: "Coastal Dresses",
    price: 10500,
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Spice", hex: "#B5651D" },
      { name: "Ocean", hex: "#0E4F52" },
      { name: "White", hex: "#FFFFFF" },
    ],
    description:
      "A generous, flowing kaftan with hand-block print detailing at the neckline. Inspired by the laid-back spirit of Arugam Bay, this dress is equally at home on the beach, at a yoga retreat, or at a boutique hotel brunch.",
    material: "100% cotton muslin, hand-printed.",
    care: "Machine wash cold, gentle. Hang dry. Iron inside out.",
    tags: ["dress", "kaftan", "women", "print"],
  },
  {
    handle: "south-coast-pocket-tee",
    title: "South Coast Pocket Tee",
    category: "men",
    collection: "Island Tees",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Ocean", hex: "#0E4F52" },
      { name: "Sand", hex: "#F4EDE1" },
      { name: "Ink", hex: "#1F2A2B" },
    ],
    description:
      "Our signature everyday tee. Crafted from heavyweight 220gsm organic cotton with a small embroidered logo at the chest pocket. A relaxed fit that doesn't crease, doesn't shrink, and only gets better with each wash.",
    material: "220gsm 100% organic cotton.",
    care: "Machine wash up to 40C. Tumble dry low. Do not iron on print.",
    isNew: true,
    isBestSeller: true,
    tags: ["tee", "basics", "unisex", "new", "bestseller"],
  },
  {
    handle: "hikkaduwa-graphic-tee",
    title: "Hikkaduwa Graphic Tee",
    category: "men",
    collection: "Island Tees",
    price: 4200,
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Off-White", hex: "#F5F0E8" },
      { name: "Vintage Black", hex: "#2C2C2C" },
    ],
    description:
      "A hand-screen-printed graphic tee featuring an original Island Mantra illustration of the Hikkaduwa coastline. Printed on garment-washed cotton for a soft, vintage feel. Each tee is slightly unique — a wearable piece of art.",
    material: "180gsm 100% organic cotton, garment washed.",
    care: "Machine wash cold, inside out. Do not tumble dry. Lay flat.",
    isBestSeller: true,
    tags: ["tee", "graphic", "unisex", "bestseller"],
  },
  {
    handle: "turtle-bay-oversized-tee",
    title: "Turtle Bay Oversized Tee",
    category: "women",
    collection: "Island Tees",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#F4EDE1" },
      { name: "Sage", hex: "#8FAF8A" },
      { name: "Lagoon", hex: "#2E7D7B" },
    ],
    description:
      "A boxy oversized silhouette with dropped shoulders and a slightly longer back. The Turtle Bay tee features a small sea turtle embroidery on the left sleeve — a nod to the beach nesting grounds near Hikkaduwa. Part of every purchase goes to the local turtle conservation project.",
    material: "200gsm 100% organic cotton.",
    care: "Machine wash cold. Tumble dry low.",
    isNew: true,
    tags: ["tee", "oversized", "unisex", "new", "eco"],
  },
  {
    handle: "mantra-stripe-tee",
    title: "Mantra Stripe Tee",
    category: "men",
    collection: "Island Tees",
    price: 3990,
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Navy/White", hex: "#2E3F6F" },
      { name: "Coral/White", hex: "#E1704B" },
    ],
    description:
      "A classic Breton stripe tee reimagined for island life. Cut slightly boxy with a crew neck. Wear tucked into wide-leg linen trousers or loose over your favourite swimwear.",
    material: "100% organic cotton jersey.",
    care: "Machine wash warm. Tumble dry medium.",
    tags: ["tee", "stripe", "unisex"],
  },
  {
    handle: "hikka-palm-straw-hat",
    title: "Hikka Palm Straw Hat",
    category: "accessories",
    collection: "Accessories",
    price: 4500,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Natural", hex: "#D4C5A9" },
      { name: "Black", hex: "#1F2A2B" },
    ],
    description:
      "Hand-woven from natural palm straw by artisans in Matara. A wide brim, an adjustable grosgrain inner band, and a packable shape — the Hikka Hat is built to travel. Every hat is unique; slight variations in weave are part of the handmade character.",
    material: "100% natural palm straw. Cotton grosgrain band.",
    care: "Spot clean with a damp cloth. Reshape while damp. Store in a dry place.",
    isNew: true,
    isBestSeller: true,
    tags: ["hat", "accessories", "unisex", "new", "bestseller", "handmade"],
  },
  {
    handle: "southside-woven-tote",
    title: "Southside Woven Tote",
    category: "accessories",
    collection: "Accessories",
    price: 5990,
    images: [
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Natural/Coral", hex: "#D4C5A9" },
      { name: "Natural/Ocean", hex: "#0E4F52" },
    ],
    description:
      "A handwoven seagrass tote with leather handles and a cotton canvas lining. Large enough for a beach day — towel, sunscreen, book, all of it. The Southside Tote gets more beautiful with use, the weave softening over time.",
    material: "Natural seagrass exterior. Cotton canvas lining. Leather handles.",
    care: "Avoid prolonged exposure to water. Spot clean. Do not machine wash.",
    isBestSeller: true,
    tags: ["bag", "tote", "accessories", "unisex", "bestseller", "handmade"],
  },
  {
    handle: "pandan-shell-bracelet",
    title: "Pandan Shell Bracelet",
    category: "accessories",
    collection: "Accessories",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "White Shell", hex: "#F5F5F0" },
      { name: "Coral Shell", hex: "#E1704B" },
      { name: "Brown Shell", hex: "#8B6345" },
    ],
    description:
      "Hand-strung with ethically collected shells from Sri Lanka's southern coast, threaded on waxed cotton cord. Each bracelet is unique — a small, wearable piece of the island. Stacks beautifully with others from the Mantra accessories range.",
    material: "Natural shells. Waxed cotton cord. Brass toggle closure.",
    care: "Remove before swimming. Store in dry place away from direct sunlight.",
    isNew: true,
    tags: ["bracelet", "jewellery", "accessories", "handmade", "new"],
  },
  {
    handle: "ocean-road-sunglasses",
    title: "Ocean Road Sunglasses",
    category: "accessories",
    collection: "Accessories",
    price: 6500,
    images: [
      "https://images.unsplash.com/photo-1510560127339-37ce679cfafa?w=800&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Tort/Green", hex: "#8B6914" },
      { name: "Black/Black", hex: "#1F2A2B" },
      { name: "Clear/Brown", hex: "#C4A882" },
    ],
    description:
      "Oversized square frames with polarised lenses and UV400 protection. Lightweight acetate construction. The Ocean Road Sunglasses are inspired by the long coast road from Colombo to Hikkaduwa — made for drives, beach days, and everything in between.",
    material: "Acetate frames. Polarised mineral glass lenses. UV400.",
    care: "Clean with the included microfibre cloth. Store in the provided case.",
    tags: ["sunglasses", "accessories", "unisex"],
  },
]

function skuFor(handle: string, size: string, color: string): string {
  const clean = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, "")
  return `${clean(handle)}-${clean(size)}-${clean(color)}`
}

function buildVariants(product: SeedProduct) {
  return product.sizes.flatMap((size) =>
    product.colors.map((color) => ({
      title:
        product.sizes.length === 1 && product.colors.length === 1
          ? product.title
          : `${size} / ${color.name}`,
      sku: skuFor(product.handle, size, color.name),
      options: {
        Size: size,
        Color: color.name,
      },
      metadata: {
        color_hex: color.hex,
      },
      prices: [
        {
          amount: product.price,
          currency_code: "lkr",
        },
      ],
    }))
  )
}

export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)

  const countries = ["lk"]

  logger.info("Seeding store data...")
  const {
    result: [defaultSalesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Default Sales Channel",
          description: "Island Mantra online store",
        },
      ],
    },
  })

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Storefront",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  })

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel.id],
    },
  })

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "Island Mantra",
          supported_currencies: [
            {
              currency_code: "lkr",
              is_default: true,
            },
          ],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      ],
    },
  })

  logger.info("Seeding region data...")
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Sri Lanka",
          currency_code: "lkr",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  })
  const region = regionResult[0]
  logger.info("Finished seeding regions.")

  logger.info("Seeding tax regions...")
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  })
  logger.info("Finished seeding tax regions.")

  logger.info("Seeding stock location data...")
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "Hikkaduwa Warehouse",
          address: {
            city: "Hikkaduwa",
            country_code: "LK",
            address_1: "",
          },
        },
      ],
    },
  })
  const stockLocation = stockLocationResult[0]

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  })

  logger.info("Seeding fulfillment data...")
  // This is created by a migration script in core.
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = shippingProfileResult[0]

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Islandwide Delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Sri Lanka",
        geo_zones: [
          {
            country_code: "lk",
            type: "country",
          },
        ],
      },
    ],
  })

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  })

  // Placeholder flat rate — replace once a courier partner (Koombiyo /
  // PickMe Flash / Domex) and rate card are confirmed with the client.
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Islandwide Delivery",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Islandwide delivery in 2-4 business days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "lkr",
            amount: 350,
          },
          {
            region_id: region.id,
            amount: 350,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  })
  logger.info("Finished seeding fulfillment data.")

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel.id],
    },
  })
  logger.info("Finished seeding stock location data.")

  logger.info("Seeding categories and collections...")
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: Object.values(CATEGORY_NAMES).map((name) => ({
        name,
        is_active: true,
      })),
    },
  })

  const collectionNames = Array.from(new Set(products.map((p) => p.collection)))
  const { result: collectionResult } = await createCollectionsWorkflow(
    container
  ).run({
    input: {
      collections: collectionNames.map((title) => ({ title })),
    },
  })
  logger.info("Finished seeding categories and collections.")

  logger.info("Seeding product data...")
  await createProductsWorkflow(container).run({
    input: {
      products: products.map((product) => {
        const category = categoryResult.find(
          (c) => c.name === CATEGORY_NAMES[product.category]
        )!
        const collection = collectionResult.find(
          (c) => c.title === product.collection
        )!

        return {
          title: product.title,
          handle: product.handle,
          category_ids: [category.id],
          collection_id: collection.id,
          description: product.description,
          material: product.material,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: product.images.map((url) => ({ url })),
          options: [
            { title: "Size", values: product.sizes },
            { title: "Color", values: product.colors.map((c) => c.name) },
          ],
          variants: buildVariants(product),
          metadata: {
            care: product.care,
            is_new: !!product.isNew,
            is_best_seller: !!product.isBestSeller,
            tags: product.tags.join(","),
          },
          sales_channels: [{ id: defaultSalesChannel.id }],
        }
      }),
    },
  })
  logger.info("Finished seeding product data.")

  logger.info("Seeding inventory levels.")
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => ({
        location_id: stockLocation.id,
        stocked_quantity: 100,
        inventory_item_id: item.id,
      })),
    },
  })
  logger.info("Finished seeding inventory levels data.")
}
