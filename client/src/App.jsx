import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./Components/Auth/RequireAuth";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/Login";
import Denied from "./Pages/Auth/Denied";
import CourseList from "./Pages/Courses/CourseList";
import CourseDescription from "./Pages/Courses/CourseDescription";
import CreateCourse from "./Pages/Courses/CreateCourse";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import AddLecture from "./Pages/Lecture/AddLecture";
import DisplayLectures from "./Pages/Lecture/DisplayLectures";
import ForgetPassword from "./Pages/Password/ForgetPassword";
import ResetPassword from "./Pages/Password/ResetPassword";
import ChangePassword from "./Pages/Password/ChangePassword";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import HomePage from "./Pages/Static/HomePage";
import AboutUs from "./Pages/Static/AboutUs";
import Contact from "./Pages/Static/Contact";
import NotFoundPage from "./Pages/Static/NotFoundPage";
import ManageTest from "./Pages/Test/ManageTest";
import AddMCQForm from "./Pages/Test/AddMCQForm";
import StartTest from "./Pages/Test/startTest";
import TestResult from "./Pages/Test/TestResult";
import Profile from "./Pages/User/Profile";
import EditProfile from "./Pages/User/EditProfile";

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

        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        {/* Requires authentication with the role "ADMIN" */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addLecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/manageTest" element={<ManageTest />} />
          <Route path="/test/addMcqForm" element={<AddMCQForm />} />
        </Route>

        <Route path="/startTest" element={<StartTest />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />
          <Route path="/course/displaylectures" element={<DisplayLectures />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/test/result" element={<TestResult />} />
        </Route>

        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
