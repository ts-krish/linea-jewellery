import express, { Router } from "express";
import * as productImageController from "../controllers/productImage";

const router: Router = express.Router();

router.get("/product-images", productImageController.getProductImages);
router.get("/product-images/:id", productImageController.getProductImageById);
router.post("/product-images", productImageController.createProductImage);
router.put("/product-images/:id", productImageController.updateProductImage);
router.delete("/product-images/:id", productImageController.deleteProductImage);

export default router;
