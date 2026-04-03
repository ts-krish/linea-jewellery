import * as cartItemRepository from "../repositories/cartItem";
import type { CartItemInput } from "../types";

export const getAllCartItems = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  return await cartItemRepository.findAll(offset, limit);
};

export const getCartItemById = async (id: string) => {
  return await cartItemRepository.findById(id);
};

export const createCartItem = async (entityData: CartItemInput) => {
  return await cartItemRepository.create(entityData);
};

export const updateCartItem = async (
  id: string,
  entityData: Partial<CartItemInput>,
) => {
  return await cartItemRepository.update(id, entityData);
};

export const deleteCartItem = async (id: string) => {
  return await cartItemRepository.remove(id);
};
