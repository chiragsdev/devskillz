import React, { useState } from "react";
import { formatDate } from "../../Utils/helpers";
import { useDispatch } from "react-redux";
import {
  addReplyInComment,
  getReplysOfComment,
  toggleIsShowReplies,
} from "../../Redux/Slices/CommentSlice";
import toast from "react-hot-toast";

const Comment = ({ commentData }) => {
  const [replyContent, setReplyContent] = useState("");

  const dispatch = useDispatch();

  const toggleShowReplies = async () => {
    console.log(commentData.isShowReplies);
    if (!commentData.isShowReplies) {
      await dispatch(getReplysOfComment({ commentData }));
    }

    dispatch(toggleIsShowReplies(commentData._id));
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleAddReply = async () => {
    if (replyContent == "") {
      toast.error("add text");
      return;
    }

    const res = await dispatch(
      addReplyInComment({ content: replyContent, commentId: commentData._id })
    );

    if (res.payload.success) {
      dispatch(getReplysOfComment({ commentData }));
    }

    setReplyContent("");
  };

  return (
    <div
      key={commentData?._id}
      className="shadow-lg bg-slate-800 rounded-md p-2 mb-4"
    >
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img src={commentData?.author?.avatar?.secure_url} alt="Avatar" />
          </div>
          <div>
            <div className="font-semibold">{commentData?.author?.fullName}</div>
            {/* <p>{commentData?._id}</p>{" "} */}
            <p className="text-gray-400">{commentData?.content}</p>
          </div>
        </div>
        <div className="text-gray-400 flex flex-col items-center justify-between">
          <div className="text-xs">{formatDate(commentData?.createdAt)}</div>
          {/* Show/hide reply input box */}
          <div
            className="text-sm text-gray-300 underline cursor-pointer"
            onClick={toggleShowReplies}
          >
            {commentData.isShowReplies ? "Hide" : "Show"} replies{" "}
            <span className=" text-gray-300">
              ({commentData.replies.length})
            </span>
          </div>
        </div>
      </div>
      {/* Conditionally render reply input box */}
      {commentData.isShowReplies && (
        <div className="flex items-center justify-between mt-4 gap-4">
          <textarea
            value={replyContent}
            onChange={handleReplyChange}
            id="commentInput"
            class="w-full h-12 bg-slate-900 border border-gray-600 focus:border-gray-500 rounded-md p-2 focus:outline-none resize-none"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            onClick={handleAddReply}
            id="addCommentBtn"
            className="btn btn-active btn-info"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
