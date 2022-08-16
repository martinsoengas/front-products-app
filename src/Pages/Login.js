import { Card, CardContent, TextField, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { login } from "../api/api";
import AuthContext from "../context/auth-context";
import CircularIndeterminate from "../Layout/CircularProgress";

//MUI
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//MUI

const Login = () => {
  //MUI Password Functions
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPasswordValues({ [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //MUI

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

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password: passwordValues.password,
    };

    sendRequest(userCredentials);
  };

  if (status === "pending") {
    return <CircularIndeterminate />;
  }

  return (
    <Card sx={{ width: "50%", margin: "0 auto", height: "500" }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {error ? error.toString() : "Please Log in"}
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
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={passwordValues.showPassword ? "text" : "password"}
                  value={passwordValues.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {passwordValues.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password *"
                />
              </FormControl>
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
