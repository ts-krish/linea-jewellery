import * as cartRepository from "../repositories/cart";
import type { CartInput } from "../types";

export const getAllCarts = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  return await cartRepository.findAll(offset, limit);
};

export const getCartById = async (id: string) => {
  return await cartRepository.findById(id);
};

export const createCart = async (entityData: CartInput) => {
  return await cartRepository.create(entityData);
};

export const updateCart = async (
  id: string,
  entityData: Partial<CartInput>,
) => {
  return await cartRepository.update(id, entityData);
};

export const deleteCart = async (id: string) => {
  return await cartRepository.remove(id);
};
