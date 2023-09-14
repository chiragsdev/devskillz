import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);
route.get("/me", getProfile);

export default route;
