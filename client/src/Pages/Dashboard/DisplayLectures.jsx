import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice.js";
import { getLectureComments } from "../../Redux/Slices/CommentSlice.js";
import LectureItem from "./LectureList";
import LeftPanel from "../../Components/Lecture/LeftPanel.jsx";
import TestButtons from "../../Components/Lecture/TestButtons.jsx";
import RightPanelHeader from "../../Components/Lecture/RightPanelHeader.jsx";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  const { role } = useSelector((state) => state?.auth);
  const { lectures, currentLecture, watchedLecturesCount } = useSelector(
    (state) => state?.lecture
  );

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    } else {
      dispatch(getCourseLectures(state?._id));
    }
  }, []);

  // useEffect(() => {
  //   if (lectures && lectures.length > 0) {
  //     // Calculate the watched lectures count
  //     setWatchedLecturesCount(lectures.filter((lec) => lec.isWatched).length);
  //   }
  // }, [lectures]);

  useEffect(() => {
    if (lectures[currentLecture]) {
      dispatch(getLectureComments(lectures[currentLecture]._id));
    }
  }, [currentLecture]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[2%]">
        <hr />
        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center gap-10 w-full">
            <LeftPanel />

            <ul className="w-1/2 p-2 shadow-[0_0_10px_black] space-y-0">
              <RightPanelHeader state={state} />
              {lectures.map((lecture, index) => {
                return (
                  <LectureItem
                    key={lecture._id}
                    lecture={lecture}
                    index={index}
                    courseId={state._id}
                  />
                );
              })}
              <TestButtons courseId={state._id} />
            </ul>
          </div>
        ) : (
          <div>
            {role == "ADMIN" ? (
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    navigate("/course/addLecture", { state: { ...state } });
                  }}
                  className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                >
                  Add First Lecture of Course
                </button>
                <button>Add Exam Questions</button>
              </div>
            ) : (
              <div>No Lectures</div>
            )}
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
