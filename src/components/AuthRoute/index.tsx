import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const AuthRoute = () => {
  const { isAuthenticated, userInfo } = useUserContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
