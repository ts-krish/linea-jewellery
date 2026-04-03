import type { Request, Response } from "express";
import * as productImageService from "../services/productImage";

export const getProductImages = async (req: Request, res: Response) => {
  try {
    const page = parseInt(String(req.query.page as string)) || 1;
    const limit = parseInt(String(req.query.limit as string)) || 20;
    const items = await productImageService.getAllProductImages(page, limit);
    res.json({ ProductImages: items });
  } catch (error) {
    console.error("Error fetching product images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductImageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const item = await productImageService.getProductImageById(id);
    if (!item) {
      res.status(404).json({ error: "ProductImage not found" });
      return;
    }
    res.json({ ProductImage: item });
  } catch (error) {
    console.error(`Error fetching product image ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProductImage = async (req: Request, res: Response) => {
  try {
    const newItem = await productImageService.createProductImage(req.body);
    res.status(201).json({ ProductImage: newItem, message: "ProductImage created successfully" });
  } catch (error) {
    console.error("Error creating product image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProductImage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: "ProductImage ID is required" });
      return;
    }
    const updatedItem = await productImageService.updateProductImage(id, req.body);
    if (!updatedItem) {
      res.status(404).json({ error: "ProductImage not found" });
      return;
    }
    res.json({ ProductImage: updatedItem, message: "ProductImage updated successfully" });
  } catch (error) {
    console.error("Error updating product image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProductImage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const success = await productImageService.deleteProductImage(id);
    if (!success) {
      res.status(404).json({ error: "ProductImage not found" });
      return;
    }
    res.json({ message: "ProductImage deleted successfully" });
  } catch (error) {
    console.error("Error deleting product image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
