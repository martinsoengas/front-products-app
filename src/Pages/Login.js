import { Card, CardContent, TextField, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { login } from "../api/api";

const Login = () => {
  const { sendRequest, status } = useHttp(login);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/");
    }
  }, [status, navigate]);

  const [email, setName] = useState("");
  const [password, setPrice] = useState("");

  const emailChangeHandler = (e) => {
    setName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    sendRequest(userCredentials);
  };

  return (
    <Card sx={{ width: "80%", margin: "0 auto", height: "500" }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Please Log in
        </Typography>
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={emailChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                onChange={passwordChangeHandler}
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
