import React, { useState } from "react";
import axios from "axios";

const AddMCQForm = ({ courseId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  const handleSubmit = async (e) => {
    console.log("question", question);
    console.log("options", options);
    console.log("correct", correctOptionIndex);
    e.preventDefault();
    try {
      await axios.post(`/api/courses/${courseId}/mcqs`, {
        question,
        options,
        correctOptionIndex,
      });
      // Handle success, clear form, etc.
    } catch (error) {
      console.error("Error adding MCQ:", error);
      // Handle error
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg"
      >
        <label className="block mb-2 font-bold text-gray-700">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">{`Option ${
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
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        <label className="block mb-2 font-bold text-gray-700">
          Correct Option:
        </label>
        <select
          value={correctOptionIndex}
          onChange={(e) => setCorrectOptionIndex(parseInt(e.target.value))}
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          {options.map((option, index) => (
            <option key={index} value={index}>{`Option ${index + 1}`}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add MCQ
        </button>
      </form>
    </div>
  );
};

export default AddMCQForm;
