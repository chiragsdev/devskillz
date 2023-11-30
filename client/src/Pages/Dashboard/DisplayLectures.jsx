import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";
import { IoMdVideocam } from "react-icons/io";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state?.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    console.log(state);
    console.log(lectures);
    console.log(role);
    if (!state) {
      navigate("/courses");
    } else {
      dispatch(getCourseLectures(state?._id));
    }
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        {/* <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name :{state?.title}
        </div> */}
        <hr />
        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center gap-10 w-full">
            <div className="space-y-5 w-full p-2 rounded-lg shadow-[0_0_10px_black]">
              {/* <video
                src={lectures[currentVideo].lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video> */}
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full h-96"
                controls
                disablePictureInPicture
                controlsList="nodownload"
              >
                {/* <source
                  src={lectures[currentVideo].lecture?.secure_url}
                  type="video/mp4"
                /> */}
                Your browser does not support the video tag.
              </video>
              <div>
                <h1>
                  <span className="text-yellow-500">Title : </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500 line-clamp-4">
                    Description :{" "}
                  </span>
                  {lectures[currentVideo]?.description}
                </p>
              </div>
            </div>
            {/* right side of display lectures */}
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-2xl text-yellow-500 flex items-center justify-between">
                <p>{state?.title}</p>
                {role == "ADMIN" && (
                  <button
                    onClick={() => {
                      navigate("/course/addLecture", { state: { ...state } });
                    }}
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add New Lectures
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, index) => {
                  return (
                    <li
                      className="cursor-pointer h-16 rounded-lg p-3 hover:bg-slate-500 transition-all ease-in-out"
                      key={lecture?._id}
                    >
                      <p
                        className=" flex items-center justify-between gap-3"
                        onClick={() => setCurrentVideo(index)}
                      >
                        {/* <span>Lecture {index + 1}</span> */}
                        <span className="flex items-center gap-2">
                          <IoMdVideocam /> {lecture?.title}
                        </span>
                        <span>
                          <input
                            checked
                            id="checked-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            title="Mark as Complete"
                          />
                        </span>
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() => {
                            onLectureDelete(state?._id, lecture?._id);
                          }}
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          <div> No lectures Added to This Course</div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
