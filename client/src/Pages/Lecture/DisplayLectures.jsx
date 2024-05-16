import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearOldLectures,
  getCourseLectures,
  getWatchHistory,
} from "../../Redux/Slices/LectureSlice.js";
import LectureItem from "../../Components/Lecture/LectureItem.jsx";
import LeftPanel from "../../Components/Lecture/LeftPanel.jsx";
import TestButtons from "../../Components/Lecture/TestButtons.jsx";
import RightPanelHeader from "../../Components/Lecture/RightPanelHeader.jsx";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { role } = useSelector((state) => state?.auth);
  const { lectures } = useSelector((state) => state?.lecture);

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    } else {
      dispatch(clearOldLectures());
      dispatch(getWatchHistory());
      dispatch(getCourseLectures(state?._id));
    }
  }, []);

  return (
    <div className="text-white w-full h-full font-custom">
      {lectures && lectures.length > 0 ? (
        <div className="flex gap-2 w-full h-full">
          <LeftPanel />

          <ul className="w-1/2 p-2 shadow-[0_0_10px_black] space-y-0 h-screen overflow-y-scroll">
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
            <TestButtons courseId={state._id} courseTitle={state.title} />
          </ul>
        </div>
      ) : (
        <div>
          {role == "ADMIN" ? (
            <div className="flex gap-10 items-center justify-center w-full h-screen">
              <button
                onClick={() => {
                  navigate("/course/addLecture", { state: { ...state } });
                }}
                className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
              >
                Add New Lectures
              </button>
              <button
                onClick={() =>
                  navigate("/manageTest", {
                    state: {
                      courseId: state._id,
                      courseTitle: state.title,
                    },
                  })
                }
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
