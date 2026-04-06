"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { useCart } from "../../context/CartContext";

type CartItemProps = {
  cart_item_id: string;
  image: string;
  title: string;
  brand: string;
  price: number;
  quantity: number;
};

const CartItem = ({
  cart_item_id,
  image,
  title,
  brand,
  price,
  quantity,
}: CartItemProps) => {
  const { changeQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="relative w-20 h-24 shrink-0">
        <Image
          loading="lazy"
          src={image}
          alt={title}
          fill
          unoptimized
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium capitalize">{title}</p>
            <p className="text-sm text-black font-bold capitalize">{brand}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() => removeFromCart(cart_item_id)}
              className="text-black/30 hover:text-black transition-colors"
              aria-label="Remove item"
            >
              <X size={14} />
            </button>
            <p className="text-sm font-medium">
              €{(price * quantity).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeQuantity(cart_item_id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </Button>
          <span className="text-sm w-6 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeQuantity(cart_item_id, quantity + 1)}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
