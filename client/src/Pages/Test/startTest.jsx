import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseMcqs,
  nextQue,
  prevQue,
  selectedAnswer,
  submitTest,
} from "../../Redux/Slices/TestSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const StartTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  const { mcqs, currentMcqIndex, selectedAnswers } = useSelector(
    (state) => state.test
  );

  useEffect(() => {
    console.log(mcqs, currentMcqIndex);
    if (state) {
      const { courseId } = state;
      dispatch(getCourseMcqs(courseId));
    } else {
      navigate(-1);
    }
  }, []);

  const handleSubmitAnswer = (mcqId, selectedOption) => {
    dispatch(selectedAnswer([mcqId, selectedOption]));
  };

  const handlePrevQue = () => {
    dispatch(prevQue());
  };

  const handleNextQue = () => {
    dispatch(nextQue());
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-4xl font-bold font-mono pb-5">
        QUE {currentMcqIndex + 1} : {mcqs[currentMcqIndex]?.question}
      </h1>
      <div className="card lg:card-side bg-base-10 shadow-xl w-1/2">
        <div className="card-body flex-col gap-5 items-center">
          {mcqs[currentMcqIndex]?.options.map((option, index) => {
            const isSelected = mcqs[currentMcqIndex]._id in selectedAnswers;
            return (
              <div
                key={index}
                className={`w-full p-2 rounded-lg flex items-center gap-4 text-xl font-mono text-center ${
                  isSelected ? "bg-light-green" : "bg-gray-900"
                }`}
              >
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={isSelected}
                  onChange={() =>
                    handleSubmitAnswer(mcqs[currentMcqIndex]._id, index)
                  }
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            );
          })}
          <div className="flex items-center gap-10">
            <button
              className="btn"
              onClick={(e) => currentMcqIndex > 0 && handlePrevQue()}
            >
              Prev
            </button>
            {currentMcqIndex == mcqs.length - 1 ? (
              <button className="btn" onClick={(e) => dispatch(submitTest())}>
                Submit Test
              </button>
            ) : (
              <button className="btn" onClick={(e) => handleNextQue()}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTest;
