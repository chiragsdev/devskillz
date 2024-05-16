import React, { useState } from "react";
import { IoMdVideocam } from "react-icons/io";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  markLecture,
  setCurrentLecture,
  unMarkLecture,
} from "../../Redux/Slices/LectureSlice.js";

const LectureItem = ({ lecture, index, courseId }) => {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.auth);
  const { currentLecture, watchHistory } = useSelector(
    (state) => state?.lecture
  );

  async function onLectureDelete(courseId, lectureId) {
    if (window.confirm("Are you sure you want to delete the Lecture!!")) {
      await dispatch(
        deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
      );
      await dispatch(getCourseLectures(courseId));
    }
  }

  const [watched, setWatched] = useState(
    watchHistory?.[courseId]?.includes(lecture._id) || false
  );

  async function handleWatchToggle(event) {
    event.stopPropagation();
    setWatched((prevWatched) => !prevWatched);

    let response;
    if (watched) {
      response = await dispatch(unMarkLecture([courseId, lecture._id]));
    } else {
      response = await dispatch(markLecture([courseId, lecture._id]));
    }

    if (!response.payload.success) {
      setWatched((prevWatched) => !prevWatched);
    }
  }

  return (
    <li
      className={`${
        index === currentLecture ? "bg-blue-200" : "bg-blue-100"
      } cursor-pointer flex items-center justify-between h-16 p-3 text-black transition-all ease-in-out`}
      key={lecture?._id}
      onClick={() => dispatch(setCurrentLecture(index))}
    >
      <p className=" flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <IoMdVideocam /> Lecture {index + 1} |
        </span>
        <span className="flex items-center gap-2 text-base text-black">
          {lecture?.title}
        </span>
      </p>
      {role === "ADMIN" ? (
        <div className="flex gap-2">
          {/* Pending feature ... Edit Lecture */}
          {/* <button
            onClick={() => {
              onLectureDelete(courseId, lecture?._id);
            }}
            className="btn-info px-2 py-1 rounded-md font-semibold text-sm"
          >
            <MdEditSquare />
          </button> */}
          <button
            onClick={() => {
              onLectureDelete(courseId, lecture?._id);
            }}
            className="btn-error px-2 py-1 rounded-md font-semibold text-sm"
          >
            <MdDelete />
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            className="checkbox cursor-default checkbox-md border-2 border-gray-400"
            checked={watched}
            onClick={(event) => handleWatchToggle(event)}
          />
          <a
            href={lecture.material.secure_url}
            download
            target="_blank"
            title="download material"
          >
            <LiaFileDownloadSolid
              title="download material"
              className="text-2xl"
            />
          </a>
        </div>
      )}
    </li>
  );
};

export default LectureItem;
