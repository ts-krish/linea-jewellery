import express, { Router } from "express";
import * as productController from "../controllers/product.ts";

const router: Router = express.Router();

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;
