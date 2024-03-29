import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  comments: [],
};

export const getLectureComments = createAsyncThunk(
  "/getcomments",
  async (lectureId) => {
    console.log("innside getLectureComments", lectureId);
    lectureId = "65e2fb3e9e70f7a9d18146d0";
    const loadingMessage = toast.loading("fetching lecture commments! ...");
    try {
      lectureId = "65e2fb3e9e70f7a9d18146d0";
      const res = await axiosInstance.get(
        `/comments/getLectureComments/${lectureId}`
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.message, { id: loadingMessage });
    }
  }
);

export const addCommentInLecture = createAsyncThunk(
  "/getcomments",
  async ({ content, lectureId }) => {
    console.log("innside getLectureComments", lectureId);
    lectureId = "65e2fb3e9e70f7a9d18146d0";
    const loadingMessage = toast.loading("fetching lecture commments! ...");
    try {
      const res = await axiosInstance.post(
        `/comments/addComment/${lectureId}`,
        {
          content,
        }
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.message, { id: loadingMessage });
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLectureComments.fulfilled, (state, action) => {
      console.log("hi", action.payload);
      state.comments = action.payload.data;
    });
  },
});

export default commentSlice.reducer;

export const {} = commentSlice.actions;
