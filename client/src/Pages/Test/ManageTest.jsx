import React, { useEffect, useState } from "react";
import AddMCQForm from "./AddMCQForm";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import MCQCard from "../../Components/MCQ/McqCard";
import { useDispatch, useSelector } from "react-redux";
import { getCourseMcqs } from "../../Redux/Slices/TestSlice";

const ManageTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { courseId, courseTitle } = state;

  const { mcqs } = useSelector((state) => state.test);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!state) {
      navigate(-1);
    } else {
      dispatch(getCourseMcqs(courseId));
    }
  }, []);

  const [editMCQ, setEditMCQ] = useState(null);

  function onEdit(mcqData) {
    console.log("mcqData inside onEdit", mcqData);
    setEditMCQ(mcqData);
    console.log("editMCQ", editMCQ);
  }

  return (
    <>
      {mcqs && mcqs.length === 0 ? (
        <>
          {role === "ADMIN" ? (
            <AddMCQForm courseId={courseId} />
          ) : (
            <div className="w-full h-screen flex items-center justify-center">
              <span className="loading loading-bars loading-lg"></span>
              <span className="loading loading-bars loading-lg"></span>
              <span className="loading loading-bars loading-lg"></span>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center font-custom text-yellow-500">
          <div className="w-1/2 flex flex-col items-center">
            <div className="w-full bg-red-900 flex items-center justify-between py-4 px-6 mb-8">
              <button
                onClick={() => navigate(-1)}
                className="text-white flex items-center focus:outline-none"
              >
                <MdArrowBack className="mr-2" />
                <span>Back To Course</span>
              </button>
              <div className="text-white text-lg font-semibold">
                {courseTitle} Test Management
              </div>
              <div className="w-6"></div>
            </div>
            <div className="w-full max-w-md">
              <AddMCQForm courseId={courseId} editMCQData={editMCQ} />
            </div>
          </div>
          <div className="w-1/2 h-screen overflow-y-scroll border-l-red-600 border-2">
            <div className="flex flex-col gap-10 items-center justify-center py-10">
              {mcqs &&
                mcqs.map((mcq, index) => {
                  return (
                    <MCQCard
                      key={mcq._id}
                      {...mcq}
                      index={index}
                      courseId={courseId}
                      onEdit={onEdit}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageTest;
