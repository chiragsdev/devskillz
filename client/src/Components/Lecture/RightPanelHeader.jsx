import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { calculateProgress } from "../../Redux/Slices/LectureSlice.js";

const RightPanelHeader = ({ state }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state?.auth);
  const { watchHistory, lectures, progress } = useSelector(
    (state) => state?.lecture
  );

  useEffect(() => {
    if (watchHistory && state) {
      dispatch(calculateProgress(state._id));
    }
  }, [watchHistory, lectures]);

  return (
    <li className="font-semibold text-2xlflex flex-col items-center justify-between mb-5">
      <div className="flex items-center w-full p-4 justify-between">
        <MdArrowBack onClick={() => navigate(-1)} className="cursor-pointer" />
        <div className=" text-yellow-500 underline text-3xl">{state.title}</div>
        <div></div>
      </div>
      {role == "ADMIN" ? (
        <div className="flex items-center justify-center gap-5 w-full">
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
        <div className="w-full bg-gray-200 rounded-lg dark:bg-gray-700 mb-6 mt-4">
          {watchHistory && (
            <div
              className="bg-green-900 text-sm  rounded-lg  font-medium text-blue-100 text-center p-0.5 leading-5"
              style={{
                width: `${progress}%`,
              }}
            >
              {progress}%
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default RightPanelHeader;
