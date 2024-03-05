import { Router } from "express";
import {
  addLectureByCourseId,
  changeWatchStatus,
  deleteLecturebyId,
  getLecturesById,
  updateLecturebyId,
} from "../controllers/LectureController.js";
import {
  authorizeSubscriber,
  authorizedRoles,
  isLoggedIn,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.get("/:courseId", isLoggedIn, authorizeSubscriber, getLecturesById);

router.put("/:lectureId", isLoggedIn, authorizeSubscriber, changeWatchStatus);

router.post(
  "/addLecture/:courseId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.fields([
    { name: "lecture", maxCount: 1 },
    { name: "material", maxCount: 1 },
  ]),
  addLectureByCourseId
);

router.delete(
  "/deleteLecture/:courseId/:lectureId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  deleteLecturebyId
);

router.put(
  "/updateLecture/:courseId/:lectureId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.fields([
    { name: "lecture", maxCount: 1 },
    { name: "material", maxCount: 1 },
  ]),
  updateLecturebyId
);

export default router;
