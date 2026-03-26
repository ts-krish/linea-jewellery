"use client";

import { MENUS } from "@/lib/navigation";
import { CartItem } from "@/modules/cart";
import logo from "@public/navbar/LINEA-1.svg";
import earring from "@public/products/earring.jpg";
import { Handbag, Heart, Search } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui";

import HoverMenu from "./HoverMenu";
import MobileMenu from "./MobileMenu";

const popular_searches = [
  "Gold Rings",
  "Silver Neckless",
  "Pearl Earnings",
  "Designer bracelets",
  "Wedding Rings",
  "Vintage Collection",
];

type CartItemProps = {
  image: StaticImageData;
  title: string;
  brand: string;
  price: number;
};

const cartItems: CartItemProps[] = [
  {
    image: earring,
    title: "Earrings",
    brand: "Pantheon",
    price: 2850,
  },
];

const Navbar = () => {
  const [openFavorite, setOpenFavorite] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100/50">
      <nav className="w-full relative">
        <div className="grid grid-cols-3 items-center p-5">
          {/* LEFT */}
          <div className="flex">
            <div className="lg:hidden">
              <MobileMenu />
            </div>

            <div className="hidden gap-8 md:flex">
              {MENUS.map((menu) => (
                <HoverMenu key={menu.title.name} menu={menu} />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Image src={logo} alt="LINEA logo" width={90} priority />
          </div>

          <div className="flex justify-end gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Search className="cursor-pointer" />
              </PopoverTrigger>

              <PopoverContent
                align="center"
                sideOffset={10}
                className="w-screen max-w-none left-0 translate-x-0 rounded-none border-none shadow-lg px-6 py-4"
              >
                <div className="lg:min-w-2xl mx-auto flex flex-col justify-center">
                  <div className="flex gap-3 items-center">
                    <Search size={20} />
                    <Input
                      autoFocus
                      className="h-auto border-none rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-gray-400 text-lg"
                      placeholder="Search for jewellery ..."
                    />
                  </div>
                  <Separator />

                  <div className="flex flex-col gap-2 my-5">
                    <p>Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {popular_searches.map((search) => (
                        <Badge
                          key={search}
                          variant="secondary"
                          className="cursor-pointer ring ring-gray-300 bg-white text-sm p-5"
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Sheet open={openFavorite} onOpenChange={setOpenFavorite}>
              <Heart
                onClick={() => setOpenFavorite((prev) => !prev)}
                className="cursor-pointer hidden md:block"
              />

              <SheetContent className="pt-3" side="right">
                <SheetHeader>
                  <SheetTitle className="text-lg">Your Favourites</SheetTitle>
                </SheetHeader>

                <Separator />

                <SheetDescription className="px-3">
                  You haven&apos;t added any favorites yet. Browse our
                  collection and click the heart icon to save items you love.
                </SheetDescription>
              </SheetContent>
            </Sheet>

            <Sheet open={openCart} onOpenChange={setOpenCart}>
              <Handbag
                onClick={() => setOpenCart(true)}
                className="cursor-pointer"
              />

              <SheetContent className="pt-3" side="right">
                <SheetHeader>
                  <SheetTitle className="text-lg">Shopping Bag</SheetTitle>
                </SheetHeader>

                <Separator />

                <div className="flex lg:hidden flex-col items-center gap-4">
                  <Button
                    className="flex items-center text-base px-20"
                    size="lg"
                    variant="outline"
                    onClick={() => setOpenFavorite((prev) => !prev)}
                  >
                    <Heart />
                    View Favourites
                  </Button>
                  <Separator />
                </div>

                <SheetDescription asChild className="px-3">
                  <div>
                    {cartItems.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-6">
                        Your cart is empty
                      </p>
                    ) : (
                      cartItems.map((item, i) => <CartItem key={i} {...item} />)
                    )}
                  </div>
                </SheetDescription>
                <Separator />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
