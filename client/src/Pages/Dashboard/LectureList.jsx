import React, { useState } from "react";
import { IoMdVideocam } from "react-icons/io";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  changeWatchStatus,
  updateLectures,
} from "../../Redux/Slices/LectureSlice.js";

const LectureList = ({
  lecture,
  index,
  currentVideo,
  setCurrentVideo,
  courseId,
}) => {
  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  async function onLectureDelete(courseId, lectureId) {
    if (window.confirm("Are you sure you want to delete the Lecture!!")) {
      await dispatch(
        deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
      );
      await dispatch(getCourseLectures(courseId));
    }
  }

  async function handleWatchToggle(LectureId) {
    // Toggle the isWatched status at backend side
    const response = await dispatch(changeWatchStatus(LectureId));
    if (response?.payload?.success) {
      // Toggle the isWatched status at client side
      dispatch(updateLectures(LectureId));
    }
  }

  return (
    <li
      className={`${
        index === currentVideo ? "bg-slate-500" : "bg-slate-100"
      } cursor-pointer flex items-center justify-between h-16 p-3 text-black transition-all ease-in-out`}
      key={lecture?._id}
      onClick={() => setCurrentVideo(index)}
    >
      <p className=" flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <IoMdVideocam /> {index + 1}
        </span>
        <span className="flex items-center gap-2">{lecture?.title}</span>
      </p>
      {role === "ADMIN" ? (
        <div className="flex gap-2">
          <button
            onClick={() => {
              onLectureDelete(courseId, lecture?._id);
            }}
            className="btn-info px-2 py-1 rounded-md font-semibold text-sm"
          >
            <MdEditSquare />
          </button>
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
            className="checkbox checkbox-md border-1 border-gray-400 "
            checked={lecture?.isWatched}
            onChange={(e) => handleWatchToggle(lecture._id)}
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

export default LectureList;
