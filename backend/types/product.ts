export interface ProductInput {
  category: string;
  brand_name: string;
  material?: string;
  length: number;
  height: number;
  weight: number;
  price: number;
  editor_note?: string;
  description?: string;
  product_details?: any;
  care_instructions?: string[];
  stock: number;
}