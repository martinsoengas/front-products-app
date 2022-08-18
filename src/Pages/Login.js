import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { login } from "../api/api";
import AuthContext from "../context/auth-context";
import CircularIndeterminate from "../Layout/CircularProgress";

//MUI
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function SignIn() {
  const { sendRequest, status, data } = useHttp(login);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "completed") {
      if (data.error) {
        setError(data.error);
        return;
      }
      if (data) {
        authCtx.setId(data._id);
        authCtx.login(data.token);
        authCtx.setIsAdmin(data.isAdmin);

        navigate("/products", { replace: true });
      }
    }
  }, [status, data, navigate, authCtx]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const emailChangeHandler = (e) => {
    if (e) {
      setEmailError(false);
    }
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    if (e) {
      setPasswordError(false);
    }
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    const userCredentials = {
      email,
      password,
    };

    sendRequest(userCredentials);
  };

  if (status === "pending") {
    return <CircularIndeterminate />;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "3rem" }}>
      <Card>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          textAlign={"center"}
        >
          {error ? error.toString() : null}
        </Typography>
        <Box
          sx={{
            margin: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={emailChangeHandler}
              error={emailError ? true : false}
              label={emailError ? "Please insert a valid email" : "Email"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChangeHandler}
              error={passwordError ? true : false}
              label={passwordError ? "Please insert a valid email" : "Password"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
