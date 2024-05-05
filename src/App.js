import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import BaseContainer from "./components/commons/BaseContainer";
import DevideSignUp from "./components/pages/SignUp/DevideSignUp";
import CandidateSignUp from "./components/pages/SignUp/CandidateSignUp";
import RecruiterSignUp from "./components/pages/SignUp/RecruiterSignUp";
import SignUp from "./components/pages/SignUp";
import ConfirmSignUp from "./components/pages/SignUp/confirmSignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseContainer />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Outlet />} />
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
  );
}

export default App;
