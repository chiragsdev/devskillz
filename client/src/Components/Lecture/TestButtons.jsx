import React from "react";
import UnlockTestDialog from "../Dialogbox/UnlockTestDialog";
import StartTestDialog from "../Dialogbox/StartTestDialog";
import { FaLock, FaUnlock } from "react-icons/fa6";
import { calculateProgress } from "../../Utils/helpers";
import { useSelector } from "react-redux";

const TestButtons = ({ courseId }) => {
  const { role } = useSelector((state) => state?.auth);
  const { lectures, currentLecture, watchedLecturesCount } = useSelector(
    (state) => state?.lecture
  );

  return (
    <div>
      {role !== "ADMIN" && (
        <li className="flex items-center justify-center pt-4">
          {calculateProgress(lectures.length, watchedLecturesCount) >= 80 ? (
            <>
              <button
                className="btn btn-wide"
                onClick={() => document.getElementById("testInfo").showModal()}
              >
                <FaUnlock /> Start Test
              </button>
              <StartTestDialog courseId={courseId} />
            </>
          ) : (
            <>
              <button
                className="btn btn-wide"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                <FaLock /> UnLock Test
              </button>
              <UnlockTestDialog />
            </>
          )}
        </li>
      )}
    </div>
  );
};

export default TestButtons;
