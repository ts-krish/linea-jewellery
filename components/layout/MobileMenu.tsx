import { Menu } from "lucide-react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui";

const SHOP_MENU = {
  title: { name: "Shop", href: "/category/shop" },
  items: [
    { name: "Rings", href: "/category/rings" },
    { name: "Necklaces", href: "/category/necklaces" },
    { name: "Earrings", href: "/category/earrings" },
    { name: "Bracelets", href: "/category/bracelets" },
    { name: "Watches", href: "/category/watches" },
  ],
};

const NEWIN_MENU = {
  title: { name: "New in", href: "/category/new-in" },
  items: [
    { name: "This Week's Arrivals", href: "/category/this-week's-arrivals" },
    { name: "Spring collection", href: "/category/spring-collection" },
    { name: "Featured Designers", href: "/category/featured-designers" },
    { name: "Limited Edition", href: "/category/limited-edition" },
    { name: "Pre-Orders", href: "/category/pre-orders" },
  ],
};

const ABOUT_MENU = {
  title: { name: "About", href: "/about" },
  items: [
    { name: "Our Story", href: "/about/our-story" },
    { name: "Sustainability", href: "/about/sustainability" },
    { name: "Size Guide", href: "/about/size-guide" },
    { name: "Customer Care", href: "/about/customer-care" },
    { name: "Store Locator", href: "/about/store-locator" },
  ],
};

const MobileMenu = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Link href={SHOP_MENU.title.href}>{SHOP_MENU.title.name}</Link>
            </SheetTitle>
            <div className="my-6 space-y-4">
              {SHOP_MENU.items.map((item) => (
                <Link key={item.name} href={item.href} className="block">
                  {item.name}
                </Link>
              ))}
            </div>
            <SheetTitle>
              <Link href={NEWIN_MENU.title.href}>{NEWIN_MENU.title.name}</Link>
            </SheetTitle>
            <div className="my-6 space-y-4">
              {NEWIN_MENU.items.map((item) => (
                <Link key={item.name} href={item.href} className="block">
                  {item.name}
                </Link>
              ))}
            </div>
            <SheetTitle>
              <Link href={ABOUT_MENU.title.href}>{ABOUT_MENU.title.name}</Link>
            </SheetTitle>
            <div className="my-6 space-y-4">
              {ABOUT_MENU.items.map((item) => (
                <Link key={item.name} href={item.href} className="block">
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
