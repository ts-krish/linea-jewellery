import type { Request, Response } from "express";
import * as cartItemService from "../services/cartItem";

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const page = parseInt(String(req.query.page as string)) || 1;
    const limit = parseInt(String(req.query.limit as string)) || 20;
    const items = await cartItemService.getAllCartItems(page, limit);
    res.json({ CartItems: items });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartItemById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const item = await cartItemService.getCartItemById(id);
    if (!item) {
      res.status(404).json({ error: "CartItem not found" });
      return;
    }
    res.json({ CartItem: item });
  } catch (error) {
    console.error(`Error fetching cart item ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCartItem = async (req: Request, res: Response) => {
  try {
    const newItem = await cartItemService.createCartItem(req.body);
    res.status(201).json({ CartItem: newItem, message: "CartItem created successfully" });
  } catch (error) {
    console.error("Error creating cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: "CartItem ID is required" });
      return;
    }
    const updatedItem = await cartItemService.updateCartItem(id, req.body);
    if (!updatedItem) {
      res.status(404).json({ error: "CartItem not found" });
      return;
    }
    res.json({ CartItem: updatedItem, message: "CartItem updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const success = await cartItemService.deleteCartItem(id);
    if (!success) {
      res.status(404).json({ error: "CartItem not found" });
      return;
    }
    res.json({ message: "CartItem deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
