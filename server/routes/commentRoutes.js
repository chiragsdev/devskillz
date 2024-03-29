import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import {
  addCommentInLecture,
  addReplyToComment,
  getLectureComments,
} from "../controllers/commentController.js";

const router = Router();

router.get("/getLectureComments/:lectureId", isLoggedIn, getLectureComments);

router.post("/addComment/:lectureId", isLoggedIn, addCommentInLecture);

router.post("/addReplyToComment/:commentId", isLoggedIn, addReplyToComment);

// router.delete("/deleteComment/:commentId", deleteComment);

// router.put("/editComment/:commentId", editComment);

export default router;
