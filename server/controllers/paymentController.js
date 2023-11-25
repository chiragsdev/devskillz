import User from "../models/userModel.js";
import Payment from "../models/paymentModel.js";
import { razorpayInstance } from "../server.js";
import AppError from "../utils/error.js";
import crypto from "crypto";

export const getRazorpayApiKey = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay Api Key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("unauthorized, please login"));
    }

    if (user.role == "ADMIN") {
      return next(new AppError("Admin cannot perchase a subscription", 400));
    }

    const subscription = await razorpayInstance.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      quantity: 1,
      total_count: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "subscription successfully",
      subscription_id: subscription.id,
      subscription,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("unauthorized, please login"));
    }

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again", 500));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";

    await user.save();

    console.log(user);

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("unauthorized, please login"));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot unsubscribe", 403));
    }

    const subscriptionId = user.subscription.id;

    const cancelSubscribe = await razorpayInstance.subscriptions.cancel(
      subscriptionId
    );

    if (cancelSubscribe.error) {
      return next(new AppError(cancelSubscribe.error.description, 500));
    }

    user.subscription.status = cancelSubscribe.status;
    await user.save();

    res.status(200).json({ success: true, message: "Unsubscribe successful" });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subscriptions = await razorpayInstance.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      subscriptions,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
