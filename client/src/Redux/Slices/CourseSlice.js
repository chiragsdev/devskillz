import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  const loadingMessage = toast.loading("fetching courses! ...");
  try {
    const res = await axiosInstance.get("/courses");
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.message, { id: loadingMessage });
  }
});

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    const loadingMessage = toast.loading("creating New course! ...");
    try {
      console.log("data", data.title);
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      console.log("fd", formData.has(title));

      const res = await axiosInstance.post("/courses", formData);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.message, { id: loadingMessage });
    }
  }
);

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  const loadingMessage = toast.loading("deleting course! ...");
  try {
    const res = await axiosInstance.delete(`/courses/${id}`);
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.message, { id: loadingMessage });
  }
});

export const updateCourse = createAsyncThunk(
  "/course/update",
  async (courseData) => {
    console.log("at update c cdata", courseData);
    const loadingMessage = toast.loading("updating course! ...");

    let formData = new FormData();
    formData.append("title", courseData?.title);
    formData.append("description", courseData?.description);
    formData.append("category", courseData?.category);
    formData.append("createdBy", courseData?.createdBy);
    formData.append("thumbnail", courseData?.thumbnail);

    console.log("formData", formData.has(title));

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    try {
      const res = await axiosInstance.put(
        `/courses/${courseData.id}`,
        formData
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.message, { id: loadingMessage });
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload) {
        state.courseData = action?.payload?.courses;
      }
    });
  },
});

export default courseSlice.reducer;
