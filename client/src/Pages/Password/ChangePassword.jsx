import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../../Redux/Slices/AuthSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.error("please Enter both Password");
      return;
    }

    const response = await dispatch(
      changePassword({ oldPassword, newPassword })
    );

    if (response?.payload?.success) {
      toast.success("password changed successfully 🔥");
      setOldPassword("");
      setNewPassword("");
    }
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center py-8 px-3 min-h-[100vh]">
      <div className=" shadow-[0_0_10px_black] px-5 pt-3 flex justify-center flex-col items-center gap-4">
        <h1 className="text-center text-4xl font-bold font-inter">
          Change Password Page
        </h1>
        <form
          onSubmit={onFormSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col items-center gap-8 rounded-lg py-7 px-3 w-96 shadow-custom"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="oldpassword" className="text-xl font-bold">
              old Password
            </label>
            <input
              type="password"
              name="oldpassword"
              id="oldpassword"
              placeholder="Enter your old password ..."
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="bg-transparent px-3 outline-none focus:border-yellow-100 py-2 border w-96"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="newpassword" className="text-xl font-bold">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="Enter your new password ..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent px-3 outline-none focus:border-yellow-100 py-2 border w-96"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-4">
            <button
              type="submit"
              className="rounded-md hover:bg-yellow-600  bg-yellow-500 text-white text-xl py-2 w-full"
            >
              change password
            </button>
            <p className="font-semibold text-base">
              <Link className="text-accent underline" to={"/user/profile"}>
                back to profile
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
