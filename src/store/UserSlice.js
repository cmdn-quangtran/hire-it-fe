import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

export const get_information = createAsyncThunk(
  "users/get_information",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userService.get_information();
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Access denied! Please try again.");
    }
  }
);


export const upload_employee_profile = createAsyncThunk(
  "user/upload_employee_profile",
  async ( data, { rejectWithValue }) => {
    try {
        const res = await userService.upload_employee_profile(data);
        return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Access denied! Please try again.");
    }
  }
);

export const upload_recruiter_profile = createAsyncThunk(
  "user/upload_recruiter_profile",
  async ( data, { rejectWithValue }) => {
    try {
        const res = await userService.upload_recruiter_profile(data);
        return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Access denied! Please try again.");
    }
  }
);
const initialState = {
  isLoading: false,
  file: null,
  user_infor: null,
  is_active: false,
  candidates: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder.addCase(get_information.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(get_information.rejected, (state, action) => {
      state.isLoading = false;
      state.user_infor = null;
      state.file = null;
    });
    builder.addCase(get_information.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user_infor = action.payload;
      state.file = action.payload.pdf_file;
    });
     builder.addCase(upload_employee_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.file = null;
     });
    builder.addCase(upload_employee_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user_infor = action.payload.data;
      state.file = action.payload.data.pdf_file;
      // firebaseService.updateUsersInConversations(state.user_infor.account.id, state.user_infor.account.first_name + " " + state.user_infor.account.last_name, state.user_infor.avatar_url);
    });
    builder.addCase(upload_recruiter_profile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(upload_recruiter_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.file = null;
    });
  },
});

export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsActive = (state) => state.user.is_active;
export const selectUserInfo = (state) => state.user.user_infor;
export const selectCandidates = (state) => state.user.candidates;
export const selectFile = (state) => state.user.file;
export default userSlice.reducer;
