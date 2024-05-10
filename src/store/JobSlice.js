import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobService from "../services/jobService";

export const get_all_jobs = createAsyncThunk(
  "employee/get_all_job",
  async (_, { rejectWithValue }) => {
    try {
        const res = await jobService.get_all_jobs();
        return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Access denied! Please try again.");
    }
  }
);
const initialState = {
  isLoading: false,
  jobs : [],
  jobs_owner: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers(builder) {
    builder.addCase(get_all_jobs.pending, (state, action) => {
      state.isLoading = true;
      state.jobs = [];
    });
    builder.addCase(get_all_jobs.rejected, (state, action) => {
      state.isLoading = false;
      state.jobs = [];
    });
    builder.addCase(get_all_jobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload.data;
    });
  },
});

export const selectIsLoading = (state) => state.job.isLoading;
export const selectJobs = (state) => state.job.jobs;
export const selectJobsOwner = (state) => state.job.jobs_owner;
export default jobSlice.reducer;