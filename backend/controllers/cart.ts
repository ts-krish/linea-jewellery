import type { Request, Response } from "express";
import * as cartService from "../services/cart";

export const getCarts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(String(req.query.page as string)) || 1;
    const limit = parseInt(String(req.query.limit as string)) || 20;
    const items = await cartService.getAllCarts(page, limit);
    res.json({ Carts: items });
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const item = await cartService.getCartById(id);
    if (!item) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }
    res.json({ Cart: item });
  } catch (error) {
    console.error(`Error fetching cart ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const newItem = await cartService.createCart(req.body);
    res.status(201).json({ Cart: newItem, message: "Cart created successfully" });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: "Cart ID is required" });
      return;
    }
    const updatedItem = await cartService.updateCart(id, req.body);
    if (!updatedItem) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }
    res.json({ Cart: updatedItem, message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const success = await cartService.deleteCart(id);
    if (!success) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
