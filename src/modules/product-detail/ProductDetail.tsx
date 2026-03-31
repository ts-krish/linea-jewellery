"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
} from "@/components/ui";
import type { ProductDetailData } from "@/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductDetail = ({ product }: { product: ProductDetailData }) => {
  const [qty, setQty] = useState(1);
  return (
    <section className="mx-auto px-5 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="flex flex-col gap-4">
          {product.images.map((img, i) => (
            <div
              key={i}
              className="relative group w-full aspect-5/6 overflow-hidden bg-neutral-50"
            >
              <Image
                src={img}
                alt={`${product.subtitle} ${i}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-250"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col h-fit sticky top-0">
          <nav className="flex gap-3 text-sm mb-8">
            <Link className="text-black/50 hover:text-black" href="/">
              Home
            </Link>
            <span>/</span>
            <Link
              className="text-black/50 hover:text-black capitalize"
              href={`/category/${product.category.toLowerCase()}`}
            >
              {product.category}
            </Link>
            <span>/</span>
            <span>{product.subtitle}</span>
          </nav>
          <p className="text-sm text-black/50 tracking-widest">
            {product.title}
          </p>

          <h1 className="text-3xl lg:text-4xl font-light mt-1 mb-6">
            {product.subtitle}
          </h1>

          <p className="text-xl font-medium mb-8">
            €{product.price.toLocaleString()}
          </p>

          <div className="mb-4 text-sm">
            <p>Material</p>
            <p className="text-black/60">{product.material}</p>
          </div>
          <div className="mb-4 text-sm">
            <p>Dimensions</p>
            <p className="text-black/60">{product.dimensions}</p>
          </div>

          <div className="mb-6 text-sm">
            <p>Weight</p>
            <p className="text-black/50">{product.weight}</p>
          </div>

          <div className="mb-8 text-sm">
            <p>Editor&apos;s notes</p>
            <p className="text-black/60">{product.editor_note}</p>
          </div>

          <Separator className="my-5" />

          <div className="flex items-center my-5 gap-2">
            <p>Quantity</p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            >
              <Minus size={14} />
            </Button>

            <span className="text-sm w-6 text-center">{qty}</span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setQty((prev) => prev + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>

          <Button className="h-12 bg-black text-white hover:bg-black/80 mb-8">
            Add to Bag
          </Button>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent className="text-sm text-black/70 leading-relaxed">
                {product.description}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent className="text-sm text-black/70 space-y-2">
                <p>SKU: {product.product_detail.SKU}</p>
                <p>Collection: {product.product_detail.Collection}</p>
                <p>Closure: {product.product_detail.Closure}</p>
                <p>Hypoallergenic: {product.product_detail.Hypoallergenic}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care">
              <AccordionTrigger>Care & Cleaning</AccordionTrigger>
              <AccordionContent className="text-sm text-black/70 space-y-2">
                <ul className="list-disc pl-5 space-y-2">
                  <li>{product.care}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reviews">
              <AccordionTrigger>Customer Reviews</AccordionTrigger>
              <AccordionContent className="space-y-6 text-sm text-black/70">
                <div>
                  <p className="font-medium text-black">Sarah M.</p>
                  <p>{product.customer_review}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
