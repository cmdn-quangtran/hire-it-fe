import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Row, Col, Button } from "react-bootstrap";
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
function Login() {
  const loading = useSelector(selectIsLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handle_submit = async (e) => {
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
    <div>
      <div className="login-page">
        <div className="login-container">
          <div className="form">
            <Form onSubmit={handle_submit} className="login-form">
              <h1>Login</h1>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={20}>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={20}>
                  <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-1">
                <Col sm={{ span: 10, offset: 1 }}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </Form.Group>
              <p>
                {" "}
                You haven't account?
                <Link className="signup-link" to="/register">
                  Sign Up
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <SpinnerLoading loading={loading} />
  );
}

export default Login;
