import arcus_bracelet from "@public/navbar/arcus-bracelet.png";
import bracelet from "@public/navbar/bracelet.png";
import earrings from "@public/navbar/earings.png";
import founders from "@public/navbar/founders.png";
import rings from "@public/navbar/ring.png";
import { Menu } from "@/types";

export const MENUS : Menu[]= [
  {
    title: { name: "Shop", href: "/category/shop" },
    items: [
      { name: "Rings", href: "/category/rings" },
      { name: "Necklaces", href: "/category/necklaces" },
      { name: "Earrings", href: "/category/earrings" },
      { name: "Bracelets", href: "/category/bracelets" },
      { name: "Watches", href: "/category/watches" },
    ],
    images: [rings, earrings],
  },
  {
    title: { name: "New in", href: "/category/new-in" },
    items: [
      { name: "This Week's Arrivals", href: "/category/this-week's-arrivals" },
      { name: "Spring collection", href: "/category/spring-collection" },
      { name: "Featured Designers", href: "/category/featured-designers" },
      { name: "Limited Edition", href: "/category/limited-edition" },
      { name: "Pre-Orders", href: "/category/pre-orders" },
    ],
    images: [bracelet, arcus_bracelet],
  },
  {
    title: { name: "About", href: "/about" },
    items: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Sustainability", href: "/about/sustainability" },
      { name: "Size Guide", href: "/about/size-guide" },
      { name: "Customer Care", href: "/about/customer-care" },
      { name: "Store Locator", href: "/about/store-locator" },
    ],
    images: [founders],
  },
];
