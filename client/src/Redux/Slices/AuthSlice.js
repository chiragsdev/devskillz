import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  const loadingMessage = toast.loading("Please wait! Creating your account...");
  try {
    const res = await axiosInstance.post("/user/register", data);
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.message, { id: loadingMessage });
    throw error;
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  const loadingMessage = toast.loading(
    "Please wait! authntication in Progress..."
  );
  try {
    const res = await axiosInstance.post("/user/login", data);
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.message, { id: loadingMessage });
    throw error;
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  const loadingMessage = toast.loading("Please wait! logout in Progress...");
  try {
    const res = await axiosInstance.get("/user/logout");
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.message, { id: loadingMessage });
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.user = action?.payload?.user;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
