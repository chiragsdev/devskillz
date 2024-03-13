import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import {
  addCommentInLecture,
  addReplyToComment,
  getAllComments,
} from "../controllers/commentController.js";

const router = Router();

router.get("/getAllComments/:lectureId", getAllComments);

router.post("/addComment/:lectureId", isLoggedIn, addCommentInLecture);

router.post("/addReplyToComment/:commentId", isLoggedIn, addReplyToComment);

// router.delete("/deleteComment/:commentId", deleteComment);

// router.put("/editComment/:commentId", editComment);

export default router;
