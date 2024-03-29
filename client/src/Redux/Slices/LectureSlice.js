import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "course/lecture/get",
  async (courseId) => {
    try {
      const response = axiosInstance.get(`/lectures/${courseId}`);
      toast.promise(response, {
        loading: "Fetching Course Lecture",
        success: "Lectures fetched successfully",
        error: "Failed to load the lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("material", data.material);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = axiosInstance.post(
        `/lectures/addLecture/${data.id}`,
        formData
      );
      console.log("res", response);
      toast.promise(response, {
        loading: "Wait !! it will take some Time to process...",
        success: "Lecture Added successfully 😃",
        error: "Failed to add the Lecture 😔",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/lectures?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(response, {
        loading: "deleting coures lecture",
        success: "Lecture deleted successfully",
        error: "Failed to delete the Lecture",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const changeWatchStatus = createAsyncThunk(
  "/course/lecture/iswatched",
  async (lectureId) => {
    try {
      const response = await axiosInstance.put(`/lectures/${lectureId}`);
      // toast.promise(response, {
      //   loading: "changning status",
      //   success: "Lecture status successfully updated",
      //   error: "Failed to update Lecture status",
      // });
      toast.success("Lecture status successfully updated", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    updateLectures: (state, action) => {
      state.lectures = state.lectures.map((lecture) => {
        if (lecture._id === action.payload) {
          // Toggle the isWatched status
          return { ...lecture, isWatched: !lecture.isWatched };
        }
        return lecture;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;

export const { updateLectures } = lectureSlice.actions;
