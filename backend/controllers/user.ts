import type { Request, Response } from "express";
import * as userService from "../services/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(String(req.query.page as string)) || 1;
    const limit = parseInt(String(req.query.limit as string)) || 20;
    const items = await userService.getAllUsers(page, limit);
    res.json({ Users: items });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const item = await userService.getUserById(id);
    if (!item) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ User: item });
  } catch (error) {
    console.error(`Error fetching user ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newItem = await userService.createUser(req.body);
    res.status(201).json({ User: newItem, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    const updatedItem = await userService.updateUser(id, req.body);
    if (!updatedItem) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ User: updatedItem, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const success = await userService.deleteUser(id);
    if (!success) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
