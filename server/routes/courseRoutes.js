import { Router } from "express";
import {
  addLectureToCouresById,
  createCourse,
  deleteCoures,
  getAllCourses,
  getLecturesByCourseId,
  removeLecterFromCourse,
  updateCoures,
} from "../controllers/courseController.js";
import {
  authorizeSubscriber,
  authorizedRoles,
  isLoggedIn,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  )
  .delete(isLoggedIn, authorizedRoles("ADMIN"), removeLecterFromCourse);

router
  .route("/:id")
  .get(isLoggedIn, authorizeSubscriber, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCoures)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCoures)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("avatar"),
    addLectureToCouresById
  );

export default router;
