import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
  UserInfo,
} from "../types/entities/auth";

export const register = (
  params: RegisterParams
): AxiosPromise<APIResponse<RegisterResponse>> => {
  return coreAPI.post("/user", params);
};

export const login = (
  params: LoginParams
): AxiosPromise<APIResponse<LoginResponse>> => {
  return coreAPI.post("/token", params);
};

export const getUserInfo = (): AxiosPromise<APIResponse<UserInfo>> => {
  const id = localStorage.getItem("userId");
  return coreAPI.get(`/user/${id}`);
};
