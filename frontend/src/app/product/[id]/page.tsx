import { ProductDetail } from "../../../modules/product-detail";
import type { ProductDetailData } from "../../../types";
import earring from "@public/products/earring.jpg";
import earring_model from "@public/products/earring_model.png";

const PRODUCTS: Record<string, ProductDetailData> = {
  pantheon: {
    id: "pantheon",
    title: "Earrings",
    subtitle: "Pantheon",
    price: 2850,
    category: "Earrings",
    material: "18k Gold Plated Sterling Silver",
    dimensions: "2.5cm x 1.2cm",
    weight: "4.2g per earring",
    editor_note:
      "A modern interpretation of classical architecture, these earrings bridge timeless elegance with contemporary minimalism.",
    description:
      "The Pantheon earrings embody architectural elegance with their clean, geometric design. Inspired by classical Roman architecture, these statement pieces feature a sophisticated interplay of curves and angles that catch and reflect light beautifully.Each earring is meticulously crafted from premium sterling silver with an 18k gold plating, ensuring both durability and luxury. The minimalist aesthetic makes them perfect for both everyday wear and special occasions.",
    product_detail: {
      SKU: "LE-PTH-001",
      Collection: "Architectural Series",
      Closure: "Post and butterfly back",
      Hypoallergenic: "Yes",
    },
    care: "Clean with a soft, dry cloth after each wear",
    customer_review:
      "Absolutely stunning earrings! The quality is exceptional and they go with everything. The architectural design is so unique and I get compliments every time I wear them.",
    images: [earring, earring_model],
  },
};

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = PRODUCTS[id];

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
