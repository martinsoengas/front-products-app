import { useState } from "react";
import React from "react";
import useHttp from "../hooks/useHttp";
import { logout } from "../api/api";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialAdmin = localStorage.getItem("admin") === "true" ? true : false;
  const initialUserId = localStorage.getItem("user");

  const { sendRequest } = useHttp(logout);

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const [isAdmin, setIsAdmin] = useState(initialAdmin);

  const userIsLoggedIn = !!token;

  const setIdHandler = (userId) => {
    setUserId(userId);
    localStorage.setItem("user", userId);
  };

  const isAdminHandler = (isAdmin) => {
    localStorage.setItem("admin", isAdmin);
    const booleanAdmin = isAdmin === "true" ? true : false;
    setIsAdmin(booleanAdmin);
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken("");
    sendRequest(userId);
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isAdmin: isAdmin,
    setId: setIdHandler,
    setIsAdmin: isAdminHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
