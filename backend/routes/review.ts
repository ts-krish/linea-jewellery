import express, { Router } from "express";
import * as reviewController from "../controllers/review";

const router: Router = express.Router();

router.get("/reviews", reviewController.getReviews);
router.get("/reviews/:id", reviewController.getReviewById);
router.post("/reviews", reviewController.createReview);
router.put("/reviews/:id", reviewController.updateReview);
router.delete("/reviews/:id", reviewController.deleteReview);

export default router;
