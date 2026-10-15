export interface Category {
  slug: "women" | "men" | "kids" | "accessories";
  name: string;
  tagline: string;
  cta: string;
  image: string;
  imageAlt: string;
}

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    tagline: "Effortless pieces for sun-drenched days.",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1777888511471-ca288dd1162f?w=1400&q=75",
    imageAlt: "Flowing dress on a tropical beach path",
  },
  {
    slug: "men",
    name: "Men",
    tagline: "Easy linen. Island-cool.",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1772583435283-b07bc9950497?w=1400&q=75",
    imageAlt: "Man in a white linen shirt on a tropical beach",
  },
  {
    slug: "kids",
    name: "Kids",
    tagline: "Made for sandcastles and saltwater.",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1616952248800-9d62f964033c?w=1400&q=75",
    imageAlt: "Two children hugging on a sunny beach",
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing touch, handcrafted.",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1566812548394-f6396d8bac5c?w=1400&q=75",
    imageAlt: "Handwoven straw bag hanging by the ocean",
  },
];
