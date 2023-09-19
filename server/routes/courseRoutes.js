import { Router } from "express";
import {
  getAllCourses,
  getLecturesByCourseId,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", getAllCourses);

router.get("/:id", getLecturesByCourseId);

export default router;
