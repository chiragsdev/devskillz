import { Router } from "express";
import {
  // addLectureToCouresById,
  createCourse,
  deleteCoures,
  getAllCourses,
  getLecturesByCourseId,
  updateCoures,
} from "../controllers/courseController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";
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
  .delete(isLoggedIn, authorizedRoles("ADMIN"), removeLectureFromCourse);

router
  .route("/:id")
  .get(isLoggedIn, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCoures)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCoures)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("avatar"),
    addLectureToCouresById
  );

export default router;
