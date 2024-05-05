import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import BaseContainer from "./components/commons/BaseContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseContainer />}>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
