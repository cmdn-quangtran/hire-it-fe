import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Profile from "./components/pages/Profile";
import Resume from "./components/pages/Resume";
import BaseContainer from "./components/commons/BaseContainer";
import DevideSignUp from "./components/pages/SignUp/DevideSignUp";
import CandidateSignUp from "./components/pages/SignUp/CandidateSignUp";
import RecruiterSignUp from "./components/pages/SignUp/RecruiterSignUp";
import SignUp from "./components/pages/SignUp";
import ConfirmSignUp from "./components/pages/SignUp/confirmSignUp";
import TurnOnJob from "./components/pages/Jobs/TurnOnJob";
import SearchJob from "./components/pages/Jobs/SearchJob";
import Jobs from "./components/pages/Jobs";
import UploadJobs from "./components/pages/UploadJobs";
import UploadFormJob from "./components/pages/UploadJobs/UploadFormJob";
import SearchCandidate from "./components/pages/Candidate/SearchCandidate";
import ChatApp from "./components/pages/Chat";
import Calendar from "./components/pages/Calendar";
import DifyChatbot from "./components/pages/ChatBot/ChatBot";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseContainer />}>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="resume" element={<Resume />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="chat" element={<ChatApp />}>
              <Route path=":chatId" element={<ChatApp />} />
            </Route>
            <Route path="jobs" element={<Jobs />}>
              <Route path="turn-on" element={<TurnOnJob />} />
              <Route path="search" element={<SearchJob />} />
              <Route path="create" element={<SearchJob />} />
            </Route>
            <Route path="recruiter/upload-jobs" element={<UploadJobs />} />
            <Route path="recruiter/create-jobs" element={<UploadFormJob />} />
            <Route
              path="candidates/search"
              element={<SearchCandidate />}
            ></Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />}>
            <Route path="" element={<DevideSignUp />} />
            <Route path="candidate" element={<CandidateSignUp />} />
            <Route path="recruiter" element={<RecruiterSignUp />} />
          </Route>
          <Route path="confirmSignUp" element={<ConfirmSignUp />}></Route>
        </Routes>
      </BrowserRouter>
      <DifyChatbot />
    </ThemeProvider>
  );
}

export default App;
