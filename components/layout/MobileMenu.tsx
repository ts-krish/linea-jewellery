import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui";

const MENUS = [
  {
    title: { name: "Shop", href: "/category/shop" },
    items: [
      { name: "Rings", href: "/category/rings" },
      { name: "Necklaces", href: "/category/necklaces" },
      { name: "Earrings", href: "/category/earrings" },
      { name: "Bracelets", href: "/category/bracelets" },
      { name: "Watches", href: "/category/watches" },
    ],
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
  },
];

const MobileMenu = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            {MENUS.map((menu) => (
              <div key={menu.title.name}>
                <SheetTitle>
                  <Link href={menu.title.href}>{menu.title.name}</Link>
                </SheetTitle>

                <div className="my-6 space-y-4">
                  {menu.items.map((item) => (
                    <Link key={item.name} href={item.href} className="block">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
