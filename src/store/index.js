import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import userReducer from "./UserSlice";
import resumeReducer from "./ResumeSlice";
import jobReducer from "./JobSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    job: jobReducer,
    resume: resumeReducer,
  },
});
