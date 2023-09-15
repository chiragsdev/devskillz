import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const route = Router();

route.post("/register", upload.single("avatar"), register);
route.post("/login", login);
route.get("/logout", logout);
route.get("/me", isLoggedIn, getProfile);

export default route;
