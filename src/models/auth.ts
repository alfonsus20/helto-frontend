import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { RegisterParams, RegisterResponse } from "../types/entities/auth";

export const register = (
  params: RegisterParams
): AxiosPromise<APIResponse<RegisterResponse>> => {
  return coreAPI.post("/user", params);
};
