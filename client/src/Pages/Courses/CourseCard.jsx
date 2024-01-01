import React from "react";
import { IoMdVideocam } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoPersonFill } from "react-icons/go";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="text-white font-custom hover:scale-101  w-[300px] h-[350px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700  transition-all duration-500 ease-in-out"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full p-2 rounded-lg group-hover:scale=[1,2] transition-all ease-in-out diration-300 hover:scale-105"
          src={data?.thumbnail?.secure_url}
          alt="courses thumbnail"
        />
        <div className="p-4 space-y-1 text-white flex flex-col">
          <h2 className="text-xl font-bold text-yellow-500 line-clame-2">
            {data?.title}
          </h2>
          <p className="line-clame-2  text-sm text-grey-200">
            {data?.description && data?.description?.length > 100
              ? `${data?.description?.slice(0, 56)}...`
              : data.description}
          </p>
          <hr className="bg-slate-400" />
          {/* <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Category : </span>
            {data?.category}
          </p> */}
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="font-semibold text-base flex items-center gap-1">
              {/* <span className="text-yellow-500 font-bold">Instructor : </span> */}
              <GoPersonFill /> {data?.createdBy}
            </p>
            {/* <p>|</p> */}
            <p className="font-semibold flex items-center justify-center gap-1">
              <IoMdVideocam />
              <span className="text-yellow-500 font-bold">Lessons : {""}</span>
              {data?.numberOfLectures || data?.lectures?.length || 18}{" "}
            </p>
          </div>
          {/* <button className="px-2 py-2 text-white bg-yellow-300 rounded-2xl text-center">
            Subcribe Course
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
