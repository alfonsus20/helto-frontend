import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { coreAPI } from "../api";
import useSnackbar from "../hooks/useSnackbar";
import { getUserInfo } from "../models/auth";
import { UserInfo } from "../types/entities/auth";
import { useLocation, useNavigate } from "react-router-dom";
import useEffectOnce from "../hooks/useEffectOnce";

type UserState = {
  isAuthenticated: boolean;
  userInfo: UserInfo;
  loginUser: (token: string, userId: number) => void;
  logoutUser: () => void;
  fetchUserInfo: () => void;
};

const defaultValue: UserState = {
  isAuthenticated: !!localStorage.getItem('token'),
  loginUser: () => { },
  logoutUser: () => { },
  fetchUserInfo: () => { },
  userInfo: { isAdmin: localStorage.getItem('isAdmin') === 'true' } as UserInfo,
};

const UserContext = createContext(defaultValue);

export const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValue.isAuthenticated
  );
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultValue.userInfo);

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const loginUser = (token: string, userId: number) => {
    coreAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("token", `Bearer ${token}`);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUserInfo({} as UserInfo);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    delete coreAPI.defaults.headers.common['Authorization'];
  };

  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserInfo();
      if (data.data) {
        setUserInfo(data.data);
        localStorage.setItem("isAdmin", String(data.data.isAdmin));
      }
    } catch (e) {
      snackbar.error((e as AxiosError).response?.data.message);
    }
  };

  useEffectOnce(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      coreAPI.defaults.headers.common['Authorization'] = token;
      setIsAuthenticated(true)
      fetchUserInfo();
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (userInfo.isAdmin && pathname === '/') {
      navigate("/admin");
    }
  }, [userInfo.isAdmin]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        logoutUser,
        userInfo,
        fetchUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
