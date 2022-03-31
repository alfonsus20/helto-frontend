import React, { createContext, useContext, useState } from "react";
import { coreAPI } from "../api";

type UserState = {
  isAuthenticated: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
};

const defaultValue: UserState = {
  isAuthenticated: !!localStorage.getItem("token"),
  loginUser: () => {},
  logoutUser: () => {},
};

const UserContext = createContext(defaultValue);

export const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValue.isAuthenticated
  );

  const loginUser = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", `Bearer ${token}`);
    coreAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    coreAPI.defaults.headers.common["Authorization"] = "";
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
