import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getSuggestions,
  updateCourse,
} from "../controllers/courseController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

// Route for getting suggestions should come before routes with :id parameter
router.route("/suggestions").get(getSuggestions);

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );
// .delete(isLoggedIn, authorizedRoles("ADMIN"), removeLecterFromCourse);

router
  .route("/:id")
  .put(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    updateCourse
  )
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCourse);

// router
//   .route("/:id")
//   .get(isLoggedIn, authorizeSubscriber, getLecturesByCourseId)
//   .put(
//     isLoggedIn,
//     authorizedRoles("ADMIN"),
//     upload.single("thumbnail"),
//     updateCourse
//   )
//   .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCourse)
//   .post(
//     isLoggedIn,
//     authorizedRoles("ADMIN"),
//     upload.single("lecture"),
//     addLectureToCourseById
//   );

export default router;
