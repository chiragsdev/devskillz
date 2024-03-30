import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  comments: [],
};

export const getLectureComments = createAsyncThunk(
  "/getComments",
  async (lectureId) => {
    try {
      const res = await axiosInstance.get(
        `/comments/getLectureComments/${lectureId}`
      );
      return res?.data;
    } catch (error) {
      toast.error(error?.message, { id: loadingMessage });
    }
  }
);

export const addCommentInLecture = createAsyncThunk(
  "/addComment",
  async ({ content, lectureId }) => {
    console.log("innside getLectureComments", lectureId);
    const loadingMessage = toast.loading("Adding comment into lecture ...");
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
    builder
      .addCase(getLectureComments.fulfilled, (state, action) => {
        console.log("hi", action.payload);
        state.comments = action.payload.data;
      })
      .addCase(addCommentInLecture.fulfilled, (state, action) => {
        console.log("new comment", action.payload.data);
        // Add the new comment to the comments array
        state.comments.push(action.payload.data);
      });
  },
});

export default commentSlice.reducer;

export const {} = commentSlice.actions;
