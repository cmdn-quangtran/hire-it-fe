import { Outlet } from "react-router-dom";
import Footer from "./Footer/index";
import Header from "./Header";
// import DefaulHeader from "../commons/Header/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { get_information } from "../../store/UserSlice";
function BaseContainer() {
  const navigate = useNavigate();
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_information());
  }, [dispatch]);

  useEffect(() => {
    if (account === null || !account) {
      navigate("/login");
    }
  }, [account, navigate]);
  return (
    <div>
      {/* <DefaulHeader /> */}
      <Header showLinks={true} />
      <div className="hireit-full-height-container">
        <div className="hireit-full-width">
          <div className="hireit-main-container">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BaseContainer;
