import { Router } from "express";
import { contactUs, stats } from "../controllers/miscellaneousController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/contact", contactUs);

router.get("/admin/stats/users", isLoggedIn, authorizedRoles("ADMIN"), stats);

export default router;
