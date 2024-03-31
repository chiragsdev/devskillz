import React from "react";
import { useNavigate } from "react-router-dom";

const StartTestDialog = ({ courseId }) => {
  const navigate = useNavigate();

  return (
    <dialog id="testInfo" className="modal">
      <div className="modal-box p-6 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-4">Test Rules</h3>
        <ul className="list-disc pl-4 mb-4">
          <li>Test contains 25 multiple-choice questions (MCQs).</li>
          <li>To receive a certificate, you must score 70+ marks.</li>
          <li>You have 25 minutes to submit the test.</li>
        </ul>
        <div className="flex justify-between">
          <button
            className="btn"
            onClick={() => document.getElementById("testInfo").close()}
          >
            Cancel
          </button>
          <button
            className="btn btn-wide btn-md"
            onClick={() =>
              navigate("/startTest", {
                state: { courseId: courseId },
              })
            }
          >
            Start Test
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default StartTestDialog;
