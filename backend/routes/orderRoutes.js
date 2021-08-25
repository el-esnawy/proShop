import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDeliver,
} from "../controllers/orderController.js";
import { authorizeAdmin, protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, authorizeAdmin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, authorizeAdmin, updateOrderToDeliver);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
