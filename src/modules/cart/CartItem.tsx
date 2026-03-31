"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type CartItemProps = {
  image: StaticImageData;
  title: string;
  brand: string;
  price: number;
};

const CartItem = ({ image, title, brand, price }: CartItemProps) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="relative w-20 h-20">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-sm text-black font-bold">{brand}</p>
          </div>

          <p className="text-sm font-medium">€{price}</p>
        </div>

        <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
};

export default CartItem;
