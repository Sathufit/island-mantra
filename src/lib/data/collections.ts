export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const collections: Collection[] = [
  {
    id: "linen-edit",
    slug: "linen-edit",
    name: "Linen Edit",
    description:
      "Breathable linen crafted for the coastal life. Relaxed silhouettes, natural tones — everything you need from sunrise beach walks to candlelit dinners.",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80",
    imageAlt: "Linen Edit collection — natural linen clothing",
  },
  {
    id: "coastal-dresses",
    slug: "coastal-dresses",
    name: "Coastal Dresses",
    description:
      "Effortless dresses designed for the island woman. From breezy maxis to midi cuts, each piece moves as freely as you do.",
    image:
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=900&q=80",
    imageAlt: "Coastal Dresses collection — flowing dresses",
  },
  {
    id: "island-tees",
    slug: "island-tees",
    name: "Island Tees",
    description:
      "Soft, wearable, honest. Our tees are the foundation of every island outfit — minimal graphics, premium cotton, made to last.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    imageAlt: "Island Tees collection — premium cotton tees",
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    description:
      "The finishing touches. Straw hats, woven bags, and handcrafted jewellery sourced from local artisans around the south coast.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80",
    imageAlt: "Accessories collection — island accessories",
  },
];
