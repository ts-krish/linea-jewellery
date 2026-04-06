"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type ApiCartItem,
  type ApiProduct,
  addCartItem,
  createCart,
  fetchProductById,
  getCartById,
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "../lib/api";

interface CartLineItem {
  cart_item_id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product: ApiProduct;
}

interface CartContextValue {
  items: CartLineItem[];
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  addToCart: (product: ApiProduct, quantity?: number) => Promise<void>;
  changeQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => void;
}

const SESSION_KEY = "linea_session_id";
const CART_KEY = "linea_cart_id";

const getOrCreateSessionId = (): string => {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cartIdRef = useRef<string | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      setIsLoading(true);
      try {
        const sessionId = getOrCreateSessionId();
        let cartId = localStorage.getItem(CART_KEY);

        if (cartId) {
          const cart = await getCartById(cartId);
          if (!cart) {
            cartId = null;
            localStorage.removeItem(CART_KEY);
          }
        }

        // Create a new cart if none found
        if (!cartId) {
          const cart = await createCart(sessionId);
          cartId = cart.cart_id;
          localStorage.setItem(CART_KEY, cartId);
        }

        cartIdRef.current = cartId;

        const rawItems = await getCartItems();
        const myItems = rawItems.filter((ci) => ci.cart_id === cartId);
        const hydrated = await hydrateItems(myItems);
        setItems(hydrated);
      } catch (err) {
        console.error("[Cart] Bootstrap failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const hydrateItems = async (
    rawItems: ApiCartItem[],
  ): Promise<CartLineItem[]> => {
    const results = await Promise.allSettled(
      rawItems.map(async (ci) => {
        const product = await fetchProductById(ci.product_id);
        if (!product) throw new Error(`Product ${ci.product_id} not found`);
        return {
          cart_item_id: ci.cart_item_id,
          cart_id: ci.cart_id,
          product_id: ci.product_id,
          quantity: ci.quantity,
          unit_price: parseFloat(ci.unit_price),
          product,
        } satisfies CartLineItem;
      }),
    );
    return results
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<CartLineItem>).value);
  };

  const addToCart = useCallback(
    async (product: ApiProduct, quantity = 1) => {
      if (!cartIdRef.current) return;
      setIsLoading(true);
      try {
        const existing = items.find((i) => i.product_id === product.product_id);
        if (existing) {
          await changeQuantity(
            existing.cart_item_id,
            existing.quantity + quantity,
          );
          return;
        }

        const newRaw = await addCartItem({
          cart_id: cartIdRef.current,
          product_id: product.product_id,
          unit_price: parseFloat(product.price),
          quantity,
        });

        const newItem: CartLineItem = {
          cart_item_id: newRaw.cart_item_id,
          cart_id: newRaw.cart_id,
          product_id: newRaw.product_id,
          quantity: newRaw.quantity,
          unit_price: parseFloat(newRaw.unit_price),
          product,
        };

        setItems((prev) => [...prev, newItem]);
      } catch (err) {
        console.error("[Cart] addToCart failed:", err);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  const changeQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      if (quantity < 1) return;
      setIsLoading(true);
      try {
        await updateCartItem(cartItemId, quantity);
        setItems((prev) =>
          prev.map((i) =>
            i.cart_item_id === cartItemId ? { ...i, quantity } : i,
          ),
        );
      } catch (err) {
        console.error("[Cart] changeQuantity failed:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const removeFromCart = useCallback(async (cartItemId: string) => {
    setIsLoading(true);
    try {
      await removeCartItem(cartItemId);
      setItems((prev) => prev.filter((i) => i.cart_item_id !== cartItemId));
    } catch (err) {
      console.error("[Cart] removeFromCart failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.unit_price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isLoading,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
