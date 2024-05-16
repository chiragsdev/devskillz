import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOldTestData,
  getCourseMcqs,
  nextQue,
  prevQue,
  selectAnswer,
  submitTest,
} from "../../Redux/Slices/TestSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

const StartTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  const { mcqs, currentMcqIndex, selectedAnswers } = useSelector(
    (state) => state.test
  );

  useEffect(() => {
    if (state) {
      console.log("state in startTet", state);
      dispatch(clearOldTestData());
      dispatch(getCourseMcqs(state.courseId));
    } else {
      navigate(-1);
    }
  }, []);

  const tickAnswer = (mcqId, index) => {
    dispatch(selectAnswer([mcqId, index]));
  };

  async function handleSubmitTest() {
    console.log("keys", Object.keys(selectedAnswers).length);
    console.log("length", mcqs.length);

    if (Object.keys(selectedAnswers).length !== mcqs.length) {
      return toast.error("Please select all MCQS");
    }
    const res = await dispatch(
      submitTest({
        courseId: state.courseId,
        selectedAnswers,
      })
    );

    if (res.payload.success) {
      console.log("pa", res.payload);
      const { obtainMarks, result, totalMarks } = res.payload;
      navigate("/test/result", {
        state: { obtainMarks, result, totalMarks, courseId: state.courseId },
      });
    }

    console.log("res", res);
  }

  return (
    <>
      {mcqs && mcqs.length === 0 ? (
        <div className="flex items-center  justify-center w-full h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col h-screen pt-10">
          <div className="flex w-full items-center justify-evenly">
            <div className="text-4xl font-bold text-gray-500 underline">
              {state.courseTitle} (Test Runuing)
            </div>
            <div className="w-44 h-28 rounded-lg flex flex-col items-start pl-2 justify-center gap-1 font-semibold shadow-2xl">
              <div>Totol MCQS: {mcqs.length}</div>
              <div>Marked MCQS: {Object.keys(selectedAnswers).length}</div>
              <div>
                UnMarked MCQS:{" "}
                {mcqs.length - Object.keys(selectedAnswers).length}
              </div>
            </div>
          </div>
          <div className="w-full font-custom px-10 h-screen flex flex-col gap-5 items-center justify-center">
            <h1 className="text-2xl font-bold pb-3 border-b-2 p-3 text-gray-400">
              QUE {currentMcqIndex + 1} : {mcqs[currentMcqIndex]?.question}
            </h1>
            <div className="card lg:card-side bg-base-10 shadow-2xl border-2 border-gray-500 w-1/2">
              <div className="card-body flex-col gap-5 items-center">
                {mcqs[currentMcqIndex]?.options.map((option, index) => (
                  <div
                    key={index}
                    className="w-full p-2 rounded-lg flex items-center bg-slate-800 gap-4 text-xl text-center"
                  >
                    <input
                      type="radio"
                      className="w-5 h-5"
                      id={`option-${index}`}
                      name="option"
                      checked={
                        selectedAnswers[mcqs[currentMcqIndex]._id] === index
                      } // Check if this option is selected
                      onChange={() =>
                        tickAnswer(mcqs[currentMcqIndex]._id, index)
                      }
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </div>
                ))}
                <div className="flex items-center gap-10">
                  <button
                    className="btn"
                    onClick={(e) => currentMcqIndex > 0 && dispatch(prevQue())}
                  >
                    <TbPlayerTrackPrevFilled />
                    Prev
                  </button>
                  {currentMcqIndex === mcqs.length - 1 ? (
                    <button
                      className="btn btn-success"
                      onClick={(e) => handleSubmitTest()}
                    >
                      Submit Test
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={(e) => dispatch(nextQue())}
                    >
                      Next
                      <TbPlayerTrackNextFilled />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartTest;
