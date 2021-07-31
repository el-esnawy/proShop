import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserbyId,
  updateUserById,
} from "../controllers/userController.js";
import { protect, authorizeAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

router.route("/").post(registerUser).get(protect, authorizeAdmin, getUsers);
router
  .route("/:id")
  .delete(protect, authorizeAdmin, deleteUser)
  .get(protect, authorizeAdmin, getUserbyId)
  .put(protect, authorizeAdmin, updateUserById);

export default router;
