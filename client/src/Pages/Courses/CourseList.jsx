import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentCourse,
  getAllCourses,
} from "../../Redux/Slices/CourseSlice.js";
import { ShimmerCards } from "../../Shimmer/CourseListShimmer.jsx";
import CourseCard from "./CourseCard.jsx";
import Search from "../../Components/Search.jsx";

const CourseList = () => {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);
  const { filterCourseData } = useSelector((state) => state.course);

  async function loadCourses() {
    if (courseData.length === 0) {
      await dispatch(getAllCourses());
    }
  }

  useEffect(() => {
    loadCourses();
    dispatch(clearCurrentCourse());
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 flex flex-col gap-10 text-white z-11">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Explore the Courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <Search />
        <div className="mb-10 flex flex-wrap items-center justify-evenly gap-y-20 gap-x-2">
          {filterCourseData.length === 0 ? (
            <ShimmerCards />
          ) : (
            <React.Fragment>
              {filterCourseData.map((course) => {
                return <CourseCard key={course._id} courseDetails={course} />;
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
