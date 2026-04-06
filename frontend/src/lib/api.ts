const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export interface ProductImage {
  image_id: string;
  image_url: string;
  image_type: "product" | "model" | string;
}

export interface ApiProduct {
  product_id: string;
  category: string;
  brand_name: string;
  material: string;
  length: string;
  height: string;
  weight: string;
  price: string;
  editor_note: string;
  description: string;
  product_details: {
    SKU: string;
    Closure: string;
    Collection: string;
    Hypoallergenic: string;
  };
  care_instructions: string[];
  stock: number;
  created_at: string;
  images: ProductImage[];
}

interface ProductsResponse {
  Products: ApiProduct[];
}

interface ProductResponse {
  Product: ApiProduct;
}

export const fetchProducts = async (): Promise<ApiProduct[]> => {
  const res = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data: ProductsResponse = await res.json();
  return data.Products;
};

export const fetchProductsByCategory = async (
  category: string,
): Promise<ApiProduct[]> => {
  const all = await fetchProducts();
  if (category === "shop") return all;
  return all.filter((p) => p.category.toLowerCase() === category.toLowerCase());
};

export const fetchProductById = async (
  id: string,
): Promise<ApiProduct | null> => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  const data: ProductResponse = await res.json();
  return data.Product;
};

export const getProductImageUrl = (product: ApiProduct): string => {
  const img =
    product.images.find((i) => i.image_type === "product") ?? product.images[0];
  return img?.image_url ?? "";
};

export const getModelImageUrl = (product: ApiProduct): string => {
  const img =
    product.images.find((i) => i.image_type === "model") ??
    product.images.find((i) => i.image_type === "product") ??
    product.images[0];
  return img?.image_url ?? "";
};

export const formatPrice = (price: string | number): string => {
  const n = typeof price === "string" ? parseFloat(price) : price;
  return `€${n.toLocaleString("en-IE", { minimumFractionDigits: 0 })}`;
};

export interface ApiCart {
  cart_id: string;
  user_id: string | null;
  session_id: string | null;
  created_at: string;
}

export interface ApiCartItem {
  cart_item_id: string;
  cart_id: string;
  product_id: string;
  unit_price: string;
  quantity: number;
  product?: ApiProduct;
}

interface CartResponse {
  Cart: ApiCart;
}
interface CartItemResponse {
  CartItem: ApiCartItem;
}
interface CartItemsResponse {
  CartItems: ApiCartItem[];
}

export const createCart = async (sessionId: string): Promise<ApiCart> => {
  const res = await fetch(`${API_BASE}/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId }),
  });
  if (!res.ok) throw new Error(`Failed to create cart: ${res.status}`);
  const data: CartResponse = await res.json();
  return data.Cart;
};

export const getCartById = async (cartId: string): Promise<ApiCart | null> => {
  const res = await fetch(`${API_BASE}/carts/${cartId}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
  const data: CartResponse = await res.json();
  return data.Cart;
};

export const getCartItems = async (): Promise<ApiCartItem[]> => {
  const res = await fetch(`${API_BASE}/cart-items`);
  if (!res.ok) throw new Error(`Failed to fetch cart items: ${res.status}`);
  const data: CartItemsResponse = await res.json();
  return data.CartItems;
};

export const addCartItem = async (payload: {
  cart_id: string;
  product_id: string;
  unit_price: number;
  quantity: number;
}): Promise<ApiCartItem> => {
  const res = await fetch(`${API_BASE}/cart-items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to add cart item: ${res.status}`);
  const data: CartItemResponse = await res.json();
  return data.CartItem;
};

export const updateCartItem = async (
  cartItemId: string,
  quantity: number,
): Promise<ApiCartItem> => {
  const res = await fetch(`${API_BASE}/cart-items/${cartItemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error(`Failed to update cart item: ${res.status}`);
  const data: CartItemResponse = await res.json();
  return data.CartItem;
};

export const removeCartItem = async (cartItemId: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/cart-items/${cartItemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to remove cart item: ${res.status}`);
};

export interface ApiReview {
  review_id: string;
  product_id: string;
  user_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface ReviewsResponse {
  Reviews: ApiReview[];
}
interface ReviewResponse {
  Review: ApiReview;
}

export const fetchReviewsByProduct = async (
  productId: string,
): Promise<ApiReview[]> => {
  const res = await fetch(`${API_BASE}/reviews`);
  if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`);
  const data: ReviewsResponse = await res.json();
  return data.Reviews.filter((r) => r.product_id === productId);
};

export const createReview = async (payload: {
  product_id: string;
  user_name: string;
  rating: number;
  comment?: string;
}): Promise<ApiReview> => {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create review: ${res.status}`);
  const data: ReviewResponse = await res.json();
  return data.Review;
};
