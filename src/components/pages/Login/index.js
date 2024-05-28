import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Grid,
  Paper,
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectAccount,
  selectIsLoading,
} from "../../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../../commons/SpinnerLoading";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

function Login() {
  const loading = useSelector(selectIsLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionResult = await dispatch(login({ email, password }));
    if (login.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload["email"]);
      navigate("/home");
    }
    if (login.rejected.match(actionResult)) {
      if (actionResult.payload.status === 406) {
        toast.warning(actionResult.payload.message);
        navigate("/confirmSignUp");
      } else {
        toast.error(actionResult.payload);
      }
    }
  };

  const account = useSelector(selectAccount);
  useEffect(() => {
    if (account !== null) {
      navigate("/");
    }
  }, [account, navigate]);

  useEffect(() => {
    document.title = "Login | Hire IT";
  }, []);
  return !account ? (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://static.vecteezy.com/system/resources/previews/005/879/539/non_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg  )",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LockOutlinedIcon />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Enter your email"
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Enter your password"
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="signup-link" to="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <SpinnerLoading loading={loading} />
  );
}

export default Login;
