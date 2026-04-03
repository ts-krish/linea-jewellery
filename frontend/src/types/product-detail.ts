export type ProductDetailData = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string;
  material: string;
  dimensions: string;
  weight: string;
  editor_note: string;
  images: string[];
  description: string;
  product_detail: {
    SKU: string;
    Collection: string;
    Closure: string;
    Hypoallergenic: string;
  };
  care: string[];
  customer_review?: string;
};
