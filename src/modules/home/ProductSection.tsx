"use client";

import bracelet_model from "@public/products/bracelet_model.png";
import earring from "@public/products/earring.jpg";
import earring_model from "@public/products/earring_model.png";
import bracelet_eclipse from "@public/products/eclispe.jpeg";
import halo from "@public/products/halo.jpeg";
import lintel from "@public/products/lintel.jpeg";
import obique from "@public/products/obique.jpeg";
import shadowline from "@public/products/shadowline.jpeg";
import Autoplay from "embla-carousel-autoplay";
import ProductCard, { Product } from "./ProductCard";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";

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

const ProductSection = () => {
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
