import Lecture from "../models/LectureModel.js";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/error.js";

export const addCommentInLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { content } = req.body;
    const { id } = req.user;

    const author = await User.findById(id);

    if (!author) {
      return next(new AppError("author Not Found", 404));
    }

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return next(new AppError("Lecture Not Found", 404));
    }

    const newComment = await Comment.create({
      content,
      author: author._id,
    });

    lecture.comments.push(newComment._id);

    await lecture.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment to lecture:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding comment In Lecture",
      error: error,
    });
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const lectureId = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return next(new AppError("lecture not found", 404));
    }

    return res.status(201).json({
      success: true,
      message: "lecture comment",
    });

  } catch (error) {}
};

export const addReplyToComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const { id } = req.user;

    if (!content) {
      return next(new AppError("content is requried", 404));
    }

    const author = await User.findById(id);

    if (!author) {
      return next(new AppError("author Not Found", 404));
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(new AppError("comment Not Found", 404));
    }

    const newComment = await Comment.create({
      content,
      author: author._id,
      parentComment: comment._id,
    });

    comment.replies.push(newComment._id);

    await comment.save();

    return res.status(201).json({
      success: true,
      message: "reply added successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Error adding reply to comment:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding reply to comment",
      error: error,
    });
  }
};
