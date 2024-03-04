import { Router } from "express";
import {
  addMcqByCourseId,
  deleteMcqById,
  editMcqById,
  getAllMcqsById,
} from "../controllers/mcqController.js";
import {
  authorizeSubscriber,
  authorizedRoles,
  isLoggedIn,
} from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/getAllMcqs/:courseId")
  .get(isLoggedIn, authorizeSubscriber, getAllMcqsById);

router
  .route("/addMcq/:courseId")
  .post(isLoggedIn, authorizedRoles("ADMIN"), addMcqByCourseId);

router
  .route("/deleteMcq/:courseId/:mcqId")
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteMcqById);

router
  .route("/editMcq/:courseId/:mcqId")
  .put(isLoggedIn, authorizedRoles("ADMIN"), editMcqById);

export default router;
