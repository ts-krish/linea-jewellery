import { fetchProductById } from "../../../lib/api";
import { ProductDetail } from "../../../modules/product-detail";
import type { ProductDetailData } from "../../../types";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let product: ProductDetailData | null = null;

  try {
    const apiProduct = await fetchProductById(id);
    if (apiProduct) {
      product = {
        id: apiProduct.product_id,
        title: apiProduct.category,
        subtitle: apiProduct.brand_name,
        price: parseFloat(apiProduct.price),
        category: apiProduct.category,
        material: apiProduct.material,
        dimensions: `${apiProduct.length}cm x ${apiProduct.height}cm`,
        weight: `${apiProduct.weight}g`,
        editor_note: apiProduct.editor_note,
        description: apiProduct.description,
        images: apiProduct.images.map((img) => img.image_url),
        product_detail: {
          SKU: apiProduct.product_details.SKU,
          Collection: apiProduct.product_details.Collection,
          Closure: apiProduct.product_details.Closure,
          Hypoallergenic: apiProduct.product_details.Hypoallergenic,
        },
        care: apiProduct.care_instructions,
      };
    }
  } catch {
    console.error(`[ProductPage] Could not fetch product ${id} from API`);
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-20 text-center">
        <h1 className="text-2xl font-light mb-4">Product not found</h1>
        <p className="text-black/50">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;
