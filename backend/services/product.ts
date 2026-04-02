import * as productRepository from "../repositories/product.ts";
import type { ProductInput } from "../repositories/product.ts";

export const getAllProducts = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  return await productRepository.findAll(offset, limit);
};

export const getProductById = async (id: string) => {
  return await productRepository.findById(id);
};

export const createProduct = async (productData: ProductInput) => {
  return await productRepository.create(productData);
};

export const updateProduct = async (id: string, productData: Partial<ProductInput>) => {
  return await productRepository.update(id, productData);
};

export const deleteProduct = async (id: string) => {
  return await productRepository.remove(id);
};
