import { Router } from "express";
import { contactUs } from "../controllers/miscellaneousController.js";

const router = Router();

router.post("/contact", contactUs);

export default router;
