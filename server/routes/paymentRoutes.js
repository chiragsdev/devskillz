import { Router } from "express";
import {
  allPayments,
  buySubscription,
  getRazorpayApiKey,
  unSubscription,
  verifySubscription,
} from "../controllers/paymentController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/razorpay-key", isLoggedIn, getRazorpayApiKey);

router.post("/subscribe", isLoggedIn, buySubscription);

router.post("/verify", isLoggedIn, verifySubscription);

router.post("/unSubscription", isLoggedIn, unSubscription);

router.get("/", isLoggedIn, authorizedRoles("ADMIN"), allPayments);

export default router;
