import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import userReducer from "./UserSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
