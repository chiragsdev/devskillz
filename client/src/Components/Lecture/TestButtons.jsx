import React from "react";
import UnlockTestDialog from "../Dialogbox/UnlockTestDialog";
import StartTestDialog from "../Dialogbox/StartTestDialog";
import { FaLock, FaUnlock } from "react-icons/fa6";
import { useSelector } from "react-redux";

const TestButtons = ({ courseId,courseTitle }) => {
  const { role } = useSelector((state) => state?.auth);
  const { progress } = useSelector((state) => state?.lecture);

  return (
    <div>
      {role !== "ADMIN" && (
        <li className="flex items-center justify-center pt-4">
          {progress >= 80 ? (
            <>
              <button
                className="btn btn-accent"
                onClick={() => document.getElementById("testInfo").showModal()}
              >
                <FaUnlock /> Start Test
              </button>
              <StartTestDialog courseId={courseId} courseTitle={courseTitle} />
            </>
          ) : (
            <>
              <button
                className="btn btn-success"
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
