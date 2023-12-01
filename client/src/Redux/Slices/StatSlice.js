import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUserCount: 0,
  subscribedCount: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const response = axiosInstance.get("/admin/stats/users");
    toast.promise(response, {
      loading: "Fetching users stats",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load the stats",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default statSlice.reducer;
