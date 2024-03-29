import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice.js";
import LectureList from "./LectureList";
import { FaLock, FaUnlock } from "react-icons/fa6";
import {
  addCommentInLecture,
  getLectureComments,
} from "../../Redux/Slices/CommentSlice.js";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state?.lecture);
  const { role } = useSelector((state) => state?.auth);
  const { comments } = useSelector((state) => state?.comment);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [watchedLecturesCount, setWatchedLecturesCount] = useState(0);

  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (lectures && lectures.length > 0) {
      // Calculate the watched lectures count
      setWatchedLecturesCount(lectures.filter((lec) => lec.isWatched).length);
    }
  }, [lectures]);

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    } else {
      dispatch(getCourseLectures(state?._id));
      console.log(state._id);
      dispatch(getLectureComments(state?._id));
    }
  }, []);

  function courseProgress() {
    if (lectures.length === 0) return 0;
    return (watchedLecturesCount / lectures.length) * 100;
  }

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[2%]">
        {/* <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name :{state?.title}
        </div> */}
        <hr />
        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center gap-10 w-full">
            <div className="space-y-5 w-full p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full h-96"
                controls
                muted
                disablePictureInPicture
                controlsList="nodownload"
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
              <div>
                <h1>
                  <span className="text-yellow-500">Title : </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p className="flex gap-3">
                  <span className="text-yellow-500 line-clamp-4">
                    Description :
                  </span>
                  <span> {lectures[currentVideo]?.description}</span>
                </p>
                <p className="flex gap-3">
                  <span className="text-yellow-500 line-clamp-4">
                    comments :
                    <div className="flex items-center justify-center gap-10">
                      <textarea
                        placeholder="add comment"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                      ></textarea>
                      <button
                        className="btn"
                        onClick={() => {
                          dispatch(
                            addCommentInLecture({
                              content: commentContent,
                              lectureId: state._id,
                            })
                          );
                        }}
                      >
                        Add Comment
                      </button>
                    </div>
                    <div className="w-full mx-10 p-10">
                      {comments &&
                        comments?.map((comment) => {
                          return (
                            <div
                              key={comment._id}
                              className="text-white flex w-full shadow-md h-24"
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center justify-center gap-10">
                                  <div className="avatar">
                                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                      <img
                                        src={comment.author.avatar.secure_url}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div>{comment.author.fullName}</div>
                                    <p>{comment.content}</p>
                                  </div>
                                </div>
                                <div>
                                  <div>{comment.createdAt}</div>
                                  <div className="link">show replies</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </span>
                  {/* <span> {lectures[currentVideo]?.description}</span> */}
                </p>
              </div>
            </div>
            {/* right side of display lectures */}
            <ul className="w-1/2 p-2 shadow-[0_0_10px_black] space-y-0">
              <li className="font-semibold text-2xl text-yellow-500 flex items-center justify-between mb-5">
                {/* <p>{state?.title}</p> */}
                {role !== "ADMIN" && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 mb-4">
                    <div
                      className="bg-green-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-5"
                      style={{
                        width: `${courseProgress()}%`,
                      }}
                    >
                      {courseProgress()}%
                    </div>
                  </div>
                )}
                {role == "ADMIN" && (
                  <div className="flex items-center justify-center gap-5 w-full">
                    <button
                      onClick={() => {
                        navigate("/course/addLecture", { state: { ...state } });
                      }}
                      className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                    >
                      Add New Lectures
                    </button>
                    <button
                      onClick={() => navigate("/manageTest")}
                      className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                    >
                      Manage Test
                    </button>
                  </div>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, index) => {
                  return (
                    <LectureList
                      key={lecture._id}
                      lecture={lecture}
                      index={index}
                      currentVideo={currentVideo}
                      setCurrentVideo={setCurrentVideo}
                      courseId={state._id}
                    />
                  );
                })}
              {role !== "ADMIN" && (
                <li className="flex items-center justify-center pt-4">
                  {courseProgress() >= 80 ? (
                    <>
                      <button
                        className="btn btn-wide"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        <FaUnlock /> Start Test
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box p-6 rounded-lg shadow-lg">
                          <h3 className="font-bold text-lg mb-4">Test Rules</h3>
                          <ul className="list-disc pl-4 mb-4">
                            <li>
                              Test contains 25 multiple-choice questions (MCQs).
                            </li>
                            <li>
                              To receive a certificate, you must score 70+
                              marks.
                            </li>
                            <li>You have 25 minutes to submit the test.</li>
                            {/* <!-- Add more rules here as needed --> */}
                          </ul>
                          <div className="flex justify-between">
                            <button
                              className="btn"
                              onClick={() =>
                                document.getElementById("my_modal_1").close()
                              }
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-wide btn-md"
                              onClick={() =>
                                navigate("/startTest", {
                                  state: { courseId: state._id },
                                })
                              }
                            >
                              Start Test
                            </button>
                          </div>
                        </div>
                      </dialog>
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
                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-lg">Sorry</h3>
                          <p className="py-4">
                            To Unlock Test You Have To Complted 80%+ Course
                          </p>
                        </div>
                      </dialog>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div>
            {role == "ADMIN" ? (
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    navigate("/course/addLecture", { state: { ...state } });
                  }}
                  className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                >
                  Add First Lecture of Course
                </button>
                <button>Add Exam Questions</button>
              </div>
            ) : (
              <div>No Lectures</div>
            )}
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
