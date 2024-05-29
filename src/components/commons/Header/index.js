import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderNavContent from "./HeaderNavContent";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLayoutEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextsmsIcon from "@mui/icons-material/Textsms";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { logout, selectIsAdmin } from "../../../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import AvatarImage from "../AvatarImage";
import { selectFile, selectUserInfo } from "../../../store/UserSlice";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const PREFIX = "DefaultHeader";

const classes = {
  logo: `${PREFIX}-logo`,
  navbar: `${PREFIX}-navbar`,
  navbarScrolled: `${PREFIX}-navbarScrolled`,
  link: `${PREFIX}-link`,
  btnBox: `${PREFIX}-btnBox`,
};

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.logo}`]: {
    width: 154,
    height: 50,
  },
  [`& .${classes.navbar}`]: {
    backgroundColor: theme.palette.background.default,
    transition: "all 0.3s ease-in-out",
  },
  [`& .${classes.navbarScrolled}`]: {
    backgroundColor: theme.palette.primary.main,
    animation: "slideInDown 0.3s",
  },
  [`& .${classes.link}`]: {
    textDecoration: "none",
    color: "inherit",
  },
  [`& .${classes.btnBox}`]: {
    display: "flex",
    alignItems: "center",
  },
}));

const Header = () => {
  const user_info = useSelector(selectUserInfo);
  const file = useSelector(selectFile);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  useLayoutEffect(() => {
    if (user_info) {
      setAvatar(user_info.avatar_url);
      setFirstName(user_info.account.first_name);
      setLastName(user_info.account.last_name);
    }
  }, [user_info]);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <Root>
      <AppBar
        position="fixed"
        className={`${classes.navbar} ${navbar ? classes.navbarScrolled : ""}`}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box className={classes.logoBox}>
              <Link to="/" className={classes.link}>
                <img
                  src="/images/logo.svg"
                  alt="brand"
                  className={classes.logo}
                />
              </Link>
            </Box>
            <HeaderNavContent />
          </Box>
          <Box sx={{ ml: "auto" }} className={classes.btnBox}>
            {isAdmin && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/recruiter/upload-jobs"
                  className="navbar-text"
                >
                  <AddCircleOutlineIcon />
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/candidates/search"
                  className="navbar-text"
                >
                  <AssignmentIndIcon />
                </Nav.Link>
              </>
            )}
            <Button
              href="/"
              variant="contained"
              color="secondary"
              data-bs-toggle="modal"
              data-bs-target="#loginPopupModal"
            >
              Login / Register
            </Button>
            <Button
              component={Link}
              to="/employers-dashboard/post-jobs"
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
            >
              Job Post
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default Header;
