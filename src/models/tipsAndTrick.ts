import { coreAPI } from "../api";

import { AxiosPromise } from "axios";
import { APIResponse } from "../types/apiResponse";
import { TipsAndTrick } from "../types/entities/tipsAndTrick";

export const getTipsAndTrickList = (
  params?: string
): AxiosPromise<APIResponse<Array<TipsAndTrick>>> => {
  return coreAPI.get(`/tips-and-trick${params}`);
};

export const createTipsAndTrick = (
  params: FormData
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post(`/tips-and-trick`, params);
};

export const editTipsAndTrick = (
  id: number,
  params: FormData
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.put(`/tips-and-trick/${id}`, params);
};

export const getTipsAndTrickById = (
  id: number
): AxiosPromise<APIResponse<TipsAndTrick>> => {
  console.log(id);
  return coreAPI.get(`/tips-and-trick/${id}`);
};

export const deleteTipsAndTrick = (
  id: number
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.delete(`/tips-and-trick/${id}`);
};
