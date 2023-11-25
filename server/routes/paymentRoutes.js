import { Router } from "express";
import {
  allPayments,
  buySubscription,
  getRazorpayApiKey,
  unsubscribe,
  verifySubscription,
} from "../controllers/paymentController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/razorpay-key", isLoggedIn, getRazorpayApiKey);

router.get("/subscribe", isLoggedIn, buySubscription);

router.post("/verify", isLoggedIn, verifySubscription);

router.post("/unsubscribe", isLoggedIn, unsubscribe);

router.get("/", isLoggedIn, authorizedRoles("ADMIN"), allPayments);

export default router;
