import type { Request, Response } from "express";
import * as productService from "../services/product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(String(req.query.page as string)) || 1;
    const limit = parseInt(String(req.query.limit as string)) || 20;
    const products = await productService.getAllProducts(page, limit);
    res.json({ Products: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await productService.getProductById(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ Product: product });
  } catch (error) {
    console.error(`Error fetching product ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res
      .status(201)
      .json({ Product: newProduct, message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: "Product ID is required" });
      return;
    }
    const updatedProduct = await productService.updateProduct(id, req.body);
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({
      Product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const success = await productService.deleteProduct(id);
    if (!success) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
