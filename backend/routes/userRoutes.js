import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  getAllUsers,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route("/allusers").get(getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/").post(registerUser);

export default router;
