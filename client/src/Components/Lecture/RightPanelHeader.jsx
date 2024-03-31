import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateProgress } from "../../Utils/helpers";

const RightPanelHeader = ({ state }) => {
  const navigate = useNavigate();

  const { role } = useSelector((state) => state?.auth);
  const { lectures, currentLecture, watchedLecturesCount } = useSelector(
    (state) => state?.lecture
  );

  return (
    <li className="font-semibold text-2xl text-yellow-500 flex items-center justify-between mb-5">
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
            onClick={() => navigate("/manageTest")}
            className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
          >
            Manage Test
          </button>
        </div>
      ) : (
        <div className="w-full bg-gray-200 dark:bg-gray-700 mb-4">
          <div
            className="bg-green-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-5"
            style={{
              width: `${calculateProgress(
                lectures.length,
                watchedLecturesCount
              )}%`,
            }}
          >
            {calculateProgress(lectures.length, watchedLecturesCount)}%
          </div>
        </div>
      )}
    </li>
  );
};

export default RightPanelHeader;
