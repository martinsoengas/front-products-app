import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AuthContext from "../context/auth-context";
import { Stack } from "@mui/material";

import { Link } from "react-router-dom";
import { useContext } from "react";

export default function ButtonAppBar() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">All Products</Link>
          </Typography>
          <Stack spacing={2} direction="row">
            {isLoggedIn && isAdmin ? (
              <Typography variant="button">
                <Link to="/new-product">New Product</Link>
              </Typography>
            ) : null}
            {isLoggedIn ? (
              <Typography variant="button">
                <Link to="/" onClick={authCtx.logout}>
                  Logout
                </Link>
              </Typography>
            ) : (
              <Typography variant="button">
                <Link to="/login">Login</Link>
              </Typography>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
