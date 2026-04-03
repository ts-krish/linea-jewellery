import type { Request, Response } from "express";
import * as reviewService from "../services/review";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const page = parseInt(String(req.query.page as string)) || 1;
    const limit = parseInt(String(req.query.limit as string)) || 20;
    const items = await reviewService.getAllReviews(page, limit);
    res.json({ Reviews: items });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const item = await reviewService.getReviewById(id);
    if (!item) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.json({ Review: item });
  } catch (error) {
    console.error(`Error fetching review ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const newItem = await reviewService.createReview(req.body);
    res.status(201).json({ Review: newItem, message: "Review created successfully" });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: "Review ID is required" });
      return;
    }
    const updatedItem = await reviewService.updateReview(id, req.body);
    if (!updatedItem) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.json({ Review: updatedItem, message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const success = await reviewService.deleteReview(id);
    if (!success) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
