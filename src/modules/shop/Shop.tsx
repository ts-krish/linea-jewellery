"use client";

import type { Product } from "@/types";
import { ProductCard } from "../home";

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import bracelet_model from "@public/products/bracelet_model.png";
import earring from "@public/products/earring.jpg";
import earring_model from "@public/products/earring_model.png";
import bracelet_eclipse from "@public/products/eclispe.jpeg";
import halo from "@public/products/halo.jpeg";
import lintel from "@public/products/lintel.jpeg";
import obique from "@public/products/obique.jpeg";
import shadowline from "@public/products/shadowline.jpeg";
import Link from "next/link";
import { useState } from "react";

interface FilterState {
  category: string[];
  price: string[];
  material: string[];
}

const filterData = {
  category: ["Earrings", "Bracelets", "Rings", "Necklaces"],
  price: ["Under €1,000", "€1,000 - €2,000", "€2,000 - €3,000", "Over €3,000"],
  material: ["Gold", "Silver", "Rose Gold", "Platinum"],
};
const products: Product[] = [
  {
    title: "Earrings",
    subtitle: "Pantheon",
    price: 2850,
    image: earring,
    hoverImage: earring_model,
  },
  {
    title: "Bracelets",
    subtitle: "Eclipes",
    price: 3200,
    image: bracelet_eclipse,
    hoverImage: bracelet_model,
  },
  {
    title: "Earrings",
    subtitle: "Halo",
    price: 1950,
    image: halo,
    hoverImage: earring_model,
  },
  {
    title: "Earrings",
    subtitle: "Obilique",
    price: 1650,
    image: obique,
    hoverImage: earring_model,
  },
  {
    title: "Earrings",
    subtitle: "Lintel",
    price: 2250,
    image: lintel,
    hoverImage: earring_model,
  },
  {
    title: "Bracelets",
    subtitle: "Shadowline",
    price: 3950,
    image: shadowline,
    hoverImage: bracelet_model,
  },
];
const Shop = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    price: [],
    material: [],
  });
  const [sort, setSort] = useState("Featured");

  const handleChange = (type: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentList = prev[type];
      const exists = currentList.includes(value);

      return {
        ...prev,
        [type]: exists
          ? currentList.filter((v) => v !== value)
          : [...currentList, value],
      };
    });
  };

  const clearAll = () => {
    setFilters({
      category: [],
      price: [],
      material: [],
    });
  };

  const applyFilters = () => {
    console.log("Applied Filters:", filters);
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      if (
        filters.category.length &&
        !filters.category.includes(product.title)
      ) {
        return false;
      }

      if (filters.price.length) {
        const priceMatch = filters.price.some((range) => {
          if (range === "Under €1,000") return product.price < 1000;
          if (range === "€1,000 - €2,000")
            return product.price >= 1000 && product.price <= 2000;
          if (range === "€2,000 - €3,000")
            return product.price > 2000 && product.price <= 3000;
          if (range === "Over €3,000") return product.price > 3000;
          return false;
        });

        if (!priceMatch) return false;
      }

      return true;
    });
  };

  const getSortedProducts = (items: Product[]) => {
    switch (sort) {
      case "low":
        return [...items].sort((a, b) => a.price - b.price);
      case "high":
        return [...items].sort((a, b) => b.price - a.price);
      case "a-z":
        return [...items].sort((a, b) => a.subtitle.localeCompare(b.subtitle));
      default:
        return items;
    }
  };

  const renderSection = (title: string, key: keyof FilterState) => (
    <div className="mb-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="flex flex-col gap-5">
        {filterData[key].map((item) => (
          <label key={item} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters[key].includes(item)}
              onCheckedChange={() => handleChange(key, item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const sortOptions = [
    { label: "Featured", value: "Featured" },
    { label: "Price: Low to high", value: "low" },
    { label: "Price: High to Low", value: "high" },
    { label: "Newest", value: "newest" },
    { label: "Name A-Z", value: "a-z" },
  ];

  const finalProducts = getSortedProducts(getFilteredProducts());
  return (
    <section>
      <div>
        <div className="p-5">
          <ul className="flex gap-3">
            <li>
              <Link className="text-black/60" href="/">
                Home
              </Link>
            </li>
            <li>&gt;</li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
          </ul>
        </div>

        <div className="p-5">
          <h1 className="text-4xl">Shop</h1>
        </div>

        <div className="flex items-center justify-between p-5">
          <span>{finalProducts.length} Items</span>
          <div className="flex gap-5">
            <Sheet>
              <SheetTrigger asChild>
                <button className="underline">Filters</button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader className="text-lg py-5 font-bold">
                  <SheetTitle className="text-lg">Filters</SheetTitle>
                  <Separator className="my-5" />
                </SheetHeader>

                <SheetDescription className="hidden"></SheetDescription>
                <div className="-mt-5 px-5">
                  {renderSection("Category", "category")}
                  {renderSection("Price", "price")}
                  {renderSection("Material", "material")}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearAll}
                  >
                    Clear All
                  </Button>
                  <Button className="flex-1" onClick={applyFilters}>
                    Apply
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 bg-white text-black px-3 py-2">
                    <span>
                      {sortOptions.find((opt) => opt.value === sort)?.label}
                    </span>
                    <span className="relative -top-2 text-xl">&#8964;</span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSort(option.value)}
                      className={sort === option.value ? "font-semibold" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="px-5 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {finalProducts.map((product) => (
              <ProductCard key={product.subtitle} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default Shop;
