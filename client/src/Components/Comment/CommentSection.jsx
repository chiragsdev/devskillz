// CommentsSection.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentInLecture,
  clearOldComments,
  getLectureComments,
} from "../../Redux/Slices/CommentSlice.js";
import toast from "react-hot-toast";
import CommentList from "./CommentList.jsx";

const CommentsSection = ({ lectureId }) => {
  const dispatch = useDispatch();

  const { currentLecture } = useSelector((state) => state?.lecture);

  const [commentContent, setCommentContent] = useState("");

  const [loadComment, setLoadComment] = useState(false);

  useEffect(() => {
    setLoadComment(false);
  }, [currentLecture]);

  // useEffect(() => {
  //   dispatch(getLectureComments(lectureId));
  // }, [lectureId]);

  function handleLoadComments() {
    setLoadComment(true);
    console.log("load comment called");
    dispatch(clearOldComments());
    dispatch(getLectureComments(lectureId));
  }

  function handleAddComment() {
    dispatch(addCommentInLecture({ content: commentContent, lectureId }));
    setCommentContent("");
  }

  return (
    <div className="text-yellow-500 font-custom line-clamp-4 p-4 rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Comments :</h2>
      <div className="mb-6 mt-4">
        <div class="w-full">
          {/* <h2 class="text-xl font-semibold mb-4">Comment</h2> */}
          <div className="flex items-end  gap-10">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              id="commentInput"
              class="w-full h-20 bg-slate-900 border border-gray-600 focus:border-gray-500 rounded-md p-2 focus:outline-none resize-none"
              placeholder="Write your comment here..."
            ></textarea>
            <button
              onClick={handleAddComment}
              disabled={!commentContent}
              id="addCommentBtn"
              className="btn btn-active btn-info"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>

      {loadComment && <CommentList />}

      <button onClick={handleLoadComments} className="btn btn-active btn-info">
        Load Comments ...
      </button>
    </div>
  );
};

export default CommentsSection;
