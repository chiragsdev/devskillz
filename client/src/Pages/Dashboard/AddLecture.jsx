import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
    material: undefined,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log(source);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  // Added function to handle material upload
  function handleMaterial(e) {
    const materialFile = e.target.files[0];
    setUserInput({
      ...userInput,
      material: materialFile,
    });
  }

  async function onFormSubmit(e) {
    console.log("userInput", userInput);
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All field are mandatory");
      return;
    }
    const response = await dispatch(addCourseLecture(userInput));
    console.log("res", response);
    if (response?.payload?.success) {
      setUserInput({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
      navigate(-1);
    }
  }

  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses");
    }
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              className="absolute left-2 text-2xl text-green-500"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-2xl text-yellow-500 font-semibold">
              Add new Lecture
            </h1>
          </header>
          <form className="flex flex-col gap-3" onSubmit={onFormSubmit}>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="enter title of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border"
              value={userInput.title}
            />
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
              value={userInput.description}
            />
            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label
                  htmlFor="lecture"
                  className="font-semibold text-xl cursor-pointer"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  name="lecture"
                  id="lecture"
                  className="hidden"
                  onChange={handleVideo}
                  accept="video/mp4 video/x-mp4 video/*"
                />
              </div>
            )}
            {/* metarial upload Input */}
            <input
              type="file"
              name="material"
              id="material"
              onChange={handleMaterial}
              accept=".pdf, .docx, .ppt, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint"
              className="file-input file-input-bordered w-full max-w-xs"
            />

            <button
              type="submit"
              className="btn btn-primary py-1 font-semibold text-lg"
            >
              Add new Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;
