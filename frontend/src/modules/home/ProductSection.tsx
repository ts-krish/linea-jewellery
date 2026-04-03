"use client"

import Autoplay from "embla-carousel-autoplay";
import {
  fetchProducts,
  getModelImageUrl,
  getProductImageUrl,
} from "../../lib/api";
import type { Product } from "../../types";
import ProductCard from "./ProductCard";
import { useState,useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../../components/ui";

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await fetchProducts();
        const formatted = apiProducts.map((p) => ({
          id: p.product_id,
          title: p.category,
          subtitle: p.brand_name,
          price: parseFloat(p.price),
          image: getProductImageUrl(p),
          hoverImage: getModelImageUrl(p),
        }));
        setProducts(formatted);
      } catch {
        console.error("[ProductSection] Could not fetch products from API");
      }
    };
    loadProducts();
  }, []);
  return (
    <section className="mx-auto px-6 py-10">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, i) => (
            <CarouselItem key={i} className="pl-4 basis-1/2 md:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductSection;
