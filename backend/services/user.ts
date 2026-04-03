import * as userRepository from "../repositories/user";
import type { UserInput } from "../types";

export const getAllUsers = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  return await userRepository.findAll(offset, limit);
};

export const getUserById = async (id: string) => {
  return await userRepository.findById(id);
};

export const createUser = async (entityData: UserInput) => {
  return await userRepository.create(entityData);
};

export const updateUser = async (
  id: string,
  entityData: Partial<UserInput>,
) => {
  return await userRepository.update(id, entityData);
};

export const deleteUser = async (id: string) => {
  return await userRepository.remove(id);
};
