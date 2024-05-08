import React from "react";
import CommentSection from "../Comment/CommentSection";
import { useSelector } from "react-redux";

const LeftPanel = () => {
  const { lectures, currentLecture } = useSelector((state) => state?.lecture);

  return (
    <div className="w-8/12 h-screen overflow-y-scroll">
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
      <div className="pl-5 mt-5 flex flex-col gap-5 font-custom">
        <div className="text-2xl">
          {/* <span className="text-yellow-500 text-2xl">Title : </span> */}
          Lecture {currentLecture + 1} |{" "}
          {lectures && lectures[currentLecture]?.title}
        </div>
        <p className="flex gap-3 text-gray-400">
          {/* <span className="text-yellow-500 line-clamp-4">Description :</span> */}
          <span> {lectures[currentLecture]?.description}</span>
        </p>
      </div>
      <CommentSection lectureId={lectures[currentLecture]?._id} />
    </div>
  );
};

export default LeftPanel;
