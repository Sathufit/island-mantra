export interface NavGroup {
  title: string;
  links: { label: string; href: string }[];
}

// Shared by the header menu and the footer — the customer's layout uses the
// same three groups in both places.
export const navGroups: NavGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "Women", href: "/women" },
      { label: "Men", href: "/men" },
      { label: "Kids", href: "/kids" },
      { label: "Accessories", href: "/accessories" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "Terms of Use",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
    ],
  },
];
