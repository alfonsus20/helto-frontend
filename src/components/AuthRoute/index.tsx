import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const isAuth = false;

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
