import express, { Router } from "express";
import * as cartItemController from "../controllers/cartItem";

const router: Router = express.Router();

router.get("/cart-items", cartItemController.getCartItems);
router.get("/cart-items/:id", cartItemController.getCartItemById);
router.post("/cart-items", cartItemController.createCartItem);
router.put("/cart-items/:id", cartItemController.updateCartItem);
router.delete("/cart-items/:id", cartItemController.deleteCartItem);

export default router;
