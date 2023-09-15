import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);
route.get("/me", isLoggedIn, getProfile);

export default route;
