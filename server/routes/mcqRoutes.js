import { Router } from "express";
import {
  addMcqByCourseId,
  deleteMcqById,
  editMcqById,
  getAllMcqsById,
} from "../controllers/mcqController.js";

const router = Router();

router.post("/addMcq/:courseId", addMcqByCourseId);

router.get("/getAllMcqs/:courseId", getAllMcqsById);

router.put("/editMcq/:id", editMcqById);

router.delete("/deleteMcq/:id", deleteMcqById);

export default router;
