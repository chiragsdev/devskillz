import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFoundPage from "./Pages/NotFoundPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CourseList from "./Pages/Courses/CourseList";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Courses/CourseDescription";
import Denied from "./Pages/Denied";
import Profile from "./Pages/User/Profile";
import CreateCourse from "./Pages/Courses/CreateCourse";
import RequireAuth from "./Components/Auth/RequireAuth";
import EditProfile from "./Pages/User/EditProfile";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutFail from "./Pages/Payment/CheckoutFail";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="course/description" element={<CourseDescription />} />

        {/* Requires authentication with the role "ADMIN" */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
        </Route>

        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
