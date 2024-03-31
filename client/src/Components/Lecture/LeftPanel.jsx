import React from "react";
import CommentSection from "../Comment/CommentSection";
import { useSelector } from "react-redux";

const LeftPanel = () => {
  const { lectures, currentLecture, watchedLecturesCount } = useSelector(
    (state) => state?.lecture
  );

  return (
    <div>
      <div className="space-y-5 w-full p-2 rounded-lg shadow-[0_0_10px_black]">
        <video
          src={lectures && lectures[currentLecture]?.lecture?.secure_url}
          className="object-fill rounded-tl-lg rounded-tr-lg w-[900px] h-96"
          controls
          muted
          disablePictureInPicture
          controlsList="nodownload"
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div>
        <div>
          <h1>
            <span className="text-yellow-500">Title : </span>
            {lectures && lectures[currentLecture]?.title}
          </h1>
          <p className="flex gap-3">
            <span className="text-yellow-500 line-clamp-4">Description :</span>
            <span> {lectures[currentLecture]?.description}</span>
          </p>
        </div>
      </div>
      <CommentSection lectureId={lectures[currentLecture]._id} />
    </div>
  );
};

export default LeftPanel;
