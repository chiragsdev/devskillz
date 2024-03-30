import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Utils/axiosInstance.js";

const initialState = {
  mcqs: [],
  currentMcqIndex: 0,
  selectedAnswers: {},
  marks: 0,
};

export const getCourseMcqs = createAsyncThunk(
  "course/mcqs/get",
  async (courseId) => {
    try {
      const response = axiosInstance.get(`/mcqs/getAllMcqs/${courseId}`);
      toast.promise(response, {
        loading: "Fetching Course mcqs",
        success: "mcqs fetched successfully",
        error: "Failed to load the mcqs",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    nextQue: (state, action) => {
      state.currentMcqIndex += 1;
    },
    prevQue: (state, action) => {
      state.currentMcqIndex -= 1;
    },
    selectedAnswer: (state, action) => {
      const [mcqId, selectedOption] = action.payload;
      state.selectedAnswers[mcqId] = selectedOption;
    },
    submitTest: (state, action) => {
      console.log("test submited");
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourseMcqs.fulfilled, (state, action) => {
      console.log(action.payload);
      state.mcqs = action.payload.data;
    });
  },
});

export default testSlice.reducer;

export const { nextQue, prevQue, selectedAnswer, submitTest } =
  testSlice.actions;
