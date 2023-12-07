import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice.js";
import { ShimmerCards } from "../../Shimmer/CourseListShimmer.jsx";
import CourseCard from "./CourseCard.jsx";
import Search from "../../Components/Search.jsx";

const CourseList = () => {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    if (courseData.length === 0) {
      await dispatch(getAllCourses());
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white z-11">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Explore the Courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <Search />
        <div className="mb-10 flex flex-wrap gap-14">
          {courseData.length === 0 ? (
            <ShimmerCards />
          ) : (
            <React.Fragment>
              {courseData.map((course) => {
                return <CourseCard key={course._id} data={course} />;
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
