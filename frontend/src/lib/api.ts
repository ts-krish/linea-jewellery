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


export const fetchProducts = async(): Promise<ApiProduct[]> => {
  const res = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data: ProductsResponse = await res.json();
  return data.Products;
}

export const fetchProductsByCategory = async(
  category: string
): Promise<ApiProduct[]> => {
  const all = await fetchProducts();
  if (category === "shop") return all;
  return all.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export const fetchProductById =async(
  id: string
): Promise<ApiProduct | null> =>{
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  const data: ProductResponse = await res.json();
  return data.Product;
}

export const getProductImageUrl = (product: ApiProduct): string => {
  const img =
    product.images.find((i) => i.image_type === "product") ??
    product.images[0];
  return img?.image_url ?? "";
}

export const getModelImageUrl = (product: ApiProduct): string =>{
  const img =
    product.images.find((i) => i.image_type === "model") ??
    product.images.find((i) => i.image_type === "product") ??
    product.images[0];
  return img?.image_url ?? "";
}

export const formatPrice = (price: string | number): string => {
  const n = typeof price === "string" ? parseFloat(price) : price;
  return `€${n.toLocaleString("en-IE", { minimumFractionDigits: 0 })}`;
}
