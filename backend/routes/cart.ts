import express, { Router } from "express";
import * as cartController from "../controllers/cart";

const router: Router = express.Router();

router.get("/carts", cartController.getCarts);
router.get("/carts/:id", cartController.getCartById);
router.post("/carts", cartController.createCart);
router.put("/carts/:id", cartController.updateCart);
router.delete("/carts/:id", cartController.deleteCart);

export default router;
