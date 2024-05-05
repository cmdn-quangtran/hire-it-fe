import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import jwtDecode from "jwt-decode";

export const login = createAsyncThunk(
  "users/login/",
  async (user, { rejectWithValue }) => {
    const { email, password } = user;
    try {
      const res = await authService.login(email, password);
      if (res.data) {
        if (res.data.access_token) {
          return res.data;
        } else if (res.status === 406) {
          return rejectWithValue(res);
        } else {
          return rejectWithValue("Login failed! Please try again.");
        }
      } else {
        return rejectWithValue("Login failed! Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
const Information = (access_token) => {
  if (access_token) {
    const decodedToken = jwtDecode(access_token);
    return decodedToken;
  }
  return null;
};
let accountString = null;
let user = null;
try {
  accountString = JSON.parse(localStorage.getItem("account"));
  if (accountString !== null) {
    user = Information(accountString?.access_token);
  }
} catch {}

const initialState = {
  user: user,
  full_name: "",
  account: accountString,
  verifyEmail: "",
  isLoading: false,
  isAdmin: Information(accountString?.access_token)?.role === 2,
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
      state.user = Information(action.payload?.access_token);
      state.isAdmin = Information(action.payload?.access_token)?.role === 2;
      localStorage.setItem("account", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.account = null;
      state.user = null;
      state.isAdmin = false;
      localStorage.setItem("account", null);
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.account = action.payload;
      localStorage.setItem("account", JSON.stringify(action.payload));
      state.user = Information(action.payload?.access_token);
      state.isAdmin = Information(action.payload?.access_token)?.role === 2;
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload.status === 406) {
        state.verifyEmail = action.payload.data.email;
      }
      state.account = null;
      state.user = null;
      state.isAdmin = false;
      localStorage.setItem("account", null);
      state.isLoading = false;
    });
  },
});

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAccount = (state) => state.auth.account;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const { logout, setAccount } = userSlice.actions;
export default userSlice.reducer;
