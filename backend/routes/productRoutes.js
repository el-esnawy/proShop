import express from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  reviewProduct,
  updateProduct,
  getTopProducts,
} from "../controllers/productController.js";

import { authorizeAdmin, protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, authorizeAdmin, createProduct);
router.get("/top", getTopProducts);

router.route("/:id/reviews").post(protect, reviewProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, authorizeAdmin, deleteProductById)
  .put(protect, authorizeAdmin, updateProduct);

export default router;
