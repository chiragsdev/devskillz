import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearOldLectures,
  getCourseLectures,
  getWatchHistory,
} from "../../Redux/Slices/LectureSlice.js";
import RightPanel from "../../Components/Lecture/RightPanel.jsx";
import VideoLecture from "../../Components/Lecture/VideoLecture.jsx";
import CommentsSection from "../../Components/Comment/CommentSection.jsx";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role } = useSelector((state) => state?.auth);
  const { lectures, currentLecture } = useSelector((state) => state?.lecture);
  const { currentCourse } = useSelector((state) => state.course);

  useEffect(() => {
    if (!currentCourse) {
      navigate("/courses");
    } else {
      dispatch(clearOldLectures());
      dispatch(getWatchHistory());
      dispatch(getCourseLectures(currentCourse?._id));
    }
  }, []);

  return (
    <div className="text-white w-full h-full font-custom">
      {lectures && lectures.length > 0 ? (
        <div className="flex flex-row gap-2 w-full h-full lg:flex-col">
          <div className="w-2/3 overflow-y-scroll h-screen lg:w-full  lg:overflow-visible">
            <VideoLecture />
            <CommentsSection lectureId={lectures[currentLecture]?._id} />
          </div>
          <RightPanel />
        </div>
      ) : (
        <div>
          {role == "ADMIN" ? (
            <div className="flex gap-10 items-center justify-center w-full h-screen">
              <button
                onClick={() => {
                  navigate("/course/addLecture");
                }}
                className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
              >
                Add New Lectures
              </button>
              <button
                onClick={() => navigate("/manageTest")}
                className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
              >
                Manage Test
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-screen">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayLectures;
