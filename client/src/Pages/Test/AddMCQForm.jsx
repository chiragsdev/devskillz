import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMcqInCourse, editMcqInCourse } from "../../Redux/Slices/TestSlice";
import toast from "react-hot-toast";

const AddMCQForm = ({ courseId, editMCQData }) => {
  const dispatch = useDispatch();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  useEffect(() => {
    if (editMCQData) {
      // If editMCQData is provided, set the form fields with its values
      setQuestion(editMCQData.question);
      setOptions(editMCQData.options);
      setCorrectOptionIndex(editMCQData.correctOptionIndex);
    }
  }, [editMCQData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || !options) {
      return toast.error("All fields are required");
    }

    const uniqueOptions = new Set(options.map((option) => option.trim()));
    if (uniqueOptions.size !== options.length) {
      return toast.error("All options Should be Unique");
    }

    let response;
    if (editMCQData) {
      response = await dispatch(
        editMcqInCourse({
          courseId: courseId,
          mcqData: {
            question,
            options,
            correctOptionIndex,
            MCQId: editMCQData._id,
          },
        })
      );
    } else {
      response = await dispatch(
        addMcqInCourse({
          courseId: courseId,
          mcqData: {
            question,
            options,
            correctOptionIndex,
          },
        })
      );
    }

    // Clear form fields on success
    if (response?.payload?.success) {
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOptionIndex(0);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-400 rounded-lg px-6"
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question:
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your question here"
          />
        </div>
        {options &&
          options.map((option, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">{`Option ${
                index + 1
              }:`}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder={`Enter option ${index + 1} here`}
              />
            </div>
          ))}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correct Option:
          </label>
          <select
            value={correctOptionIndex}
            onChange={(e) => setCorrectOptionIndex(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            {options.map((option, index) => (
              <option key={index} value={index}>
                {`Option ${index + 1}`} {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMCQData ? "Edit MCQ" : "Add MCQ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMCQForm;
