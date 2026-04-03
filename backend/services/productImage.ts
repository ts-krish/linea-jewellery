import * as productImageRepository from "../repositories/productImage";
import type { ProductImageInput } from "../types";

export const getAllProductImages = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  return await productImageRepository.findAll(offset, limit);
};

export const getProductImageById = async (id: string) => {
  return await productImageRepository.findById(id);
};

export const createProductImage = async (entityData: ProductImageInput) => {
  return await productImageRepository.create(entityData);
};

export const updateProductImage = async (
  id: string,
  entityData: Partial<ProductImageInput>,
) => {
  return await productImageRepository.update(id, entityData);
};

export const deleteProductImage = async (id: string) => {
  return await productImageRepository.remove(id);
};
