import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import AddMCQForm from "./AddMCQForm";
import { useNavigate } from "react-router-dom";

const ManageTest = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <div className="w-screen h-screen flex items-center justify-center">
        <button onClick={() => navigate("/test/addMcqForm")}>Add MCQ</button>
      </div>
    </HomeLayout>
  );
};

export default ManageTest;
