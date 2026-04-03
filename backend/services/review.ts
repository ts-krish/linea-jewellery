import * as reviewRepository from "../repositories/review";
import type { ReviewInput } from "../types";

export const getAllReviews = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  return await reviewRepository.findAll(offset, limit);
};

export const getReviewById = async (id: string) => {
  return await reviewRepository.findById(id);
};

export const createReview = async (entityData: ReviewInput) => {
  return await reviewRepository.create(entityData);
};

export const updateReview = async (
  id: string,
  entityData: Partial<ReviewInput>,
) => {
  return await reviewRepository.update(id, entityData);
};

export const deleteReview = async (id: string) => {
  return await reviewRepository.remove(id);
};
