import {
  fetchProductsByCategory,
  getModelImageUrl,
  getProductImageUrl,
} from "../../../lib/api";
import { Category } from "../../../modules/category";
import { Product } from "../../../types";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let products: Product[] = [];
  try {
    const apiProducts = await fetchProductsByCategory(slug);
    products = apiProducts.map((p) => ({
      id: p.product_id,
      title: p.category,
      subtitle: p.brand_name,
      price: parseFloat(p.price),
      image: getProductImageUrl(p),
      hoverImage: getModelImageUrl(p),
    }));
  } catch {
    console.error("[CategoryPage] Could not fetch products from API");
  }

  return <Category slug={slug} products={products} />;
};

export default CategoryPage;
