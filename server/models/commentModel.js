import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
    default: null,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});

const Comment = model("comments", commentSchema);

export default Comment;
