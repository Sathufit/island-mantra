export interface Category {
  slug: "women" | "men" | "kids" | "accessories";
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
}

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    tagline: "Coastal fashion for the island woman.",
    image:
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&q=80",
    imageAlt: "Island Mantra women's collection — flowing dresses on the coast",
  },
  {
    slug: "men",
    name: "Men",
    tagline: "Linen and cotton, cut for the coast.",
    image:
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=1200&q=80",
    imageAlt: "Island Mantra men's collection — linen shirts",
  },
  {
    slug: "kids",
    name: "Kids",
    tagline: "Island life, scaled down.",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1200&q=80",
    imageAlt: "Island Mantra kids collection",
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing touches, handcrafted on the south coast.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80",
    imageAlt: "Island Mantra accessories — straw hats and woven bags",
  },
];
