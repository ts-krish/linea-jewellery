"use client";

import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const slug = product.subtitle.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link href={`/product/${slug}`} className="group cursor-pointer block">
      <div className="group cursor-pointer">
        <div className="relative w-full aspect-square lg:h-100 overflow-hidden">
          <div className="absolute inset-0 bg-black/2 z-10 pointer-events-none" />
          <Image
            src={product.image}
            alt={product.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />

          <Image
            src={product.hoverImage}
            alt={product.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="mt-3 flex justify-between items-start">
          <div>
            <p className="text-sm font-medium">{product.title}</p>
            <p className="text-sm font-bold">{product.subtitle}</p>
          </div>

          <p className="text-sm font-medium">€{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
