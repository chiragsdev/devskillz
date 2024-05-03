import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getProfile,
  login,
  logout,
  markLecture,
  register,
  resetPassword,
  unMarkLecture,
  updateUserProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put(
  "/update/:id",
  isLoggedIn,
  upload.single("avatar"),
  updateUserProfile
);

router.post("/mark-lecture", isLoggedIn, markLecture);

router.post("unmark-lecture", isLoggedIn, unMarkLecture);

export default router;
