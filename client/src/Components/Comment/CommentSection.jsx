// CommentsSection.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentInLecture,
  getLectureComments,
} from "../../Redux/Slices/CommentSlice.js";
import toast from "react-hot-toast";
import CommentList from "./CommentList.jsx";

const CommentsSection = ({ lectureId }) => {
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    dispatch(getLectureComments(lectureId));
  }, [lectureId]);

  function handleAddComment() {
    if (commentContent !== "") {
      dispatch(addCommentInLecture({ content: commentContent, lectureId }));
      setCommentContent("");
    } else {
      toast.error("please add comment text");
    }
  }

  return (
    <div className="text-yellow-500 line-clamp-4 p-4 rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Comments:</h2>
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add comment"
          className="input input-bordered input-lg  w-full max-w-xs"
        />
        <button className="btn btn-primary" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      <CommentList />
    </div>
  );
};

export default CommentsSection;
