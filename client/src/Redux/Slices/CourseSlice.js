import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  courseData: [],
  suggestions: [],
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
    const loadingMessage = toast.loading("updating course! ...");

    let formData = new FormData();
    formData.append("title", courseData?.title);
    formData.append("description", courseData?.description);
    formData.append("category", courseData?.category);
    formData.append("createdBy", courseData?.createdBy);
    formData.append("thumbnail", courseData?.thumbnail);

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

export const getSuggestions = createAsyncThunk(
  "/course/suggestions",
  async (query) => {
    try {
      const res = await axiosInstance.get(
        `/courses/suggestions?query=${query}`
      );
      return res?.data;
    } catch (error) {
      toast.error(error?.message);
      // Make sure to return a rejected promise in case of an error
      throw error;
    }
  }
);

// export const searchCourse = createAsyncThunk("/course/search");

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    searchCourse: (state, action) => {
      console.log("hello");
      console.log(action?.payload);
      const searchTerm = action.payload.toLowerCase();

      // Implement your search logic here
      state.courseData = state.courseData.filter((course) => {
        const titleMatch = course.title.toLowerCase().includes(searchTerm);
        const createdByMatch = course.createdBy
          .toLowerCase()
          .includes(searchTerm);
        const categoryMatch = course.category
          .toLowerCase()
          .includes(searchTerm);

        // Return true if any of the fields match the search term
        return titleMatch || createdByMatch || categoryMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.fulfilled, (state, action) => {
        if (action?.payload) {
          state.courseData = action?.payload?.courses;
        }
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.suggestions = action?.payload?.suggestionStrings;
      });
  },
});

export const { searchCourse } = courseSlice.actions;
export default courseSlice.reducer;
