import React, { useEffect, useState } from "react";
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
    <div key={commentData?._id} className="bg-gray-800 rounded-md p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img src={commentData?.author?.avatar?.secure_url} alt="Avatar" />
          </div>
          <div>
            <div className="font-semibold">{commentData?.author?.fullName}</div>
            <p>{commentData?._id}</p>{" "}
            <p className="text-gray-400">{commentData?.content}</p>
          </div>
        </div>
        <div className="text-gray-400">
          <div>{formatDate(commentData?.createdAt)}</div>
          {/* Show/hide reply input box */}
          <div className="link" onClick={toggleShowReplies}>
            {commentData.isShowReplies ? "Hide" : "Show"} replies
          </div>
        </div>
      </div>
      {/* Conditionally render reply input box */}
      {commentData.isShowReplies && (
        <div className="flex items-center justify-between mt-4">
          <input
            type="text"
            value={replyContent}
            onChange={handleReplyChange}
            placeholder="Add reply"
            className="input input-bordered input-md w-full"
          />
          <button className="btn btn-primary" onClick={handleAddReply}>
            Add Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
