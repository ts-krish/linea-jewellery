"use client";

import type { Product } from "../../types";
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
} from "../../components/ui";

import Link from "next/link";
import { useState } from "react";

interface FilterState {
  price: string[];
  material: string[];
}

const filterData = {
  price: ["Under €1,000", "€1,000 - €2,000", "€2,000 - €3,000", "Over €3,000"],
  material: ["Gold", "Silver", "Rose Gold", "Platinum"],
};

const categoryMap: Record<string, string> = {
  earrings: "Earrings",
  bracelets: "Bracelets",
  rings: "Rings",
  necklaces: "Necklaces",
};

interface CategoryProps {
  slug: string;
  products: Product[];
}

const Category = ({ slug, products }: CategoryProps) => {
  const [filters, setFilters] = useState<FilterState>({
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
      price: [],
      material: [],
    });
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      // category from slug
      if (slug !== "shop") {
        const mapped = categoryMap[slug.toLowerCase()];
        if (!mapped || product.title !== mapped) return false;
      }

      // price
      if (filters.price.length) {
        const match = filters.price.some((range) => {
          if (range === "Under €1,000") return product.price < 1000;
          if (range === "€1,000 - €2,000")
            return product.price >= 1000 && product.price <= 2000;
          if (range === "€2,000 - €3,000")
            return product.price > 2000 && product.price <= 3000;
          if (range === "Over €3,000") return product.price > 3000;
          return false;
        });

        if (!match) return false;
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

  const finalProducts = getSortedProducts(getFilteredProducts());

  const sortOptions = [
    { label: "Featured", value: "Featured" },
    { label: "Price: Low to high", value: "low" },
    { label: "Price: High to Low", value: "high" },
    { label: "Newest", value: "newest" },
    { label: "Name A-Z", value: "a-z" },
  ];

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

  return (
    <section>
      <div className="p-5">
        <ul className="flex gap-3">
          <li>
            <Link className="text-black/60" href="/">
              Home
            </Link>
          </li>
          <li>&gt;</li>
          <li>
            <Link href="/category/shop">Shop</Link>
          </li>
        </ul>
      </div>

      <div className="p-5">
        <h1 className="text-4xl capitalize">
          {slug === "shop" ? "Shop" : slug}
        </h1>
      </div>

      <div className="flex items-center justify-between p-5">
        <span>{finalProducts.length} Items</span>

        <div className="flex gap-5">
          <Sheet>
            <SheetTrigger asChild>
              <button>Filters</button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <Separator />
              </SheetHeader>

              <SheetDescription className="hidden" />

              <div className="px-5">
                {renderSection("Price", "price")}
                {renderSection("Material", "material")}
              </div>

              <div className="mt-6 px-5">
                <Button variant="outline" className="w-full" onClick={clearAll}>
                  Clear All
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2">
                {sortOptions.find((opt) => opt.value === sort)?.label}
                <span>⌄</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {sortOptions.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={sort === opt.value ? "font-semibold" : ""}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="px-5 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {finalProducts.map((product) => (
            <ProductCard key={product.subtitle} product={product} />
          ))}
        </div>
      </div>

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
    </section>
  );
};

export default Category;
